import { collection, doc, setDoc } from "firebase/firestore";
import { restaurants } from "../store/restaurants";
import { db } from "./firebaseConfig";


const restaurantData = restaurants;

export const uploadData = async () =>{
  try {
     for(let i = 0;i<restaurantData.length ; i++){
          const restaurant = restaurantData[i]
          const resRef = doc(collection(db,"restaurants"),`restaurant_${i+1}`)
          await setDoc(resRef,restaurant)
     }
     console.log("data uplaoded")
  } catch (error) {
     console.log("error as firestore",error)
  }
}