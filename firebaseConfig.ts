// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ====================================================================================
//  PASSO FINAL: COLE AQUI A CONFIGURAÇÃO DO SEU PROJETO FIREBASE
// ====================================================================================
//  Cole o objeto 'firebaseConfig' que você copiou do site do Firebase aqui embaixo.
//  Substitua o objeto de exemplo pelas suas informações reais.
// ====================================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBnWcLUUd92Qmgeq6D8r5zAK3Co-OouLIE",
  authDomain: "blocccc.firebaseapp.com",
  projectId: "blocccc",
  storageBucket: "blocccc.firebasestorage.app",
  messagingSenderId: "211855163587",
  appId: "1:211855163587:web:918d4506737e31d55c6276",
  measurementId: "G-R7JMLP9R3G"
};

// ====================================================================================
//  Lembre-se de habilitar o login com Google no console do Firebase!
//  (Authentication -> Sign-in method -> Habilitar Google)
// ====================================================================================


// Inicializa o Firebase com as suas configurações
const app = initializeApp(firebaseConfig);

// Exporta os serviços que serão utilizados no restante do aplicativo
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, signInWithRedirect };