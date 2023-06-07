import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from './fbConfig';

class FbService {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    getAllPosts = async () => {
        const res = await firebase.database().ref("events").get();
        const data = res.toJSON();
        return Object.values(data);
        // return res.val();
    }
    //     getPost = async (id) => {
    //       const res = await firebase.database().ref(`ngo/${id}`).get();
    //       return res.val();
    //    }

    createPost = async (postData) => {
        console.log(postData);
        const res = await firebase.database().ref('events').orderByKey().limitToLast(1).get();

        const lastItemJson = res.toJSON();
        const lastItem = Object.values(lastItemJson)[0];
        const { id } = lastItem;
        console.log("second part");

        const newItem = {
            ...postData,
            id: id + 1
        }
        console.log("newitem", newItem);
        await firebase.database().ref(`/events/${id}`).set(newItem);
        return newItem;

    }

    deletePost = async (id) => {
        const res = await firebase.database().ref(`events/${id}`).remove();
        const posts = await this.getAllPosts();
        console.log("delete", posts);
        await firebase.database().ref('events')
            .set(posts.map((el, index) => {
                console.log("Element", index);
                return {
                    ...el,
                    id: index
                }
            }))
    }

    updatePost = async (data) => {
        const res = await firebase.database().ref(`events/${data.id}`).update(data);
    }
    fromResToUser = (res) => {
        const { uid, email, displayName, photoURL } = res.user;
        return { uid, email, displayName, photoURL };
    }
    // signup = async (credentials) => {
    //     console.log('email', credentials.email);
    //     const res = await firebase.auth().createUserWithEmailAndPassword("nazik@mail.ru", "password")
    //     .then((credentials) =>{
    //         console.log("credential",credentials)
    //     }).catch((error)=>{
    //         console.log("error");
    //     })     


    //     const user = firebase.auth().currentUser;
    //     await user.updateProfile({
    //         displayName: credentials.displayName
    //     })
    //     return this.fromResToUser(res);
    // }

    signup = (credentials) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                console.log("its worked");
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    login = (credentials) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                return user;
                console.log("sigin in", user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }




}
const fbService = new FbService();
export default fbService;