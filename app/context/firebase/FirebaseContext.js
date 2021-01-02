import React, { useEffect, useState, createContext } from "react";
import firebase from "../../firebase";
export const FirebaseContext = createContext();

export default function FirebaseProvider({ children }) {
	const [user, setUser] = useState({});
	const [isAuth, setIsAuth] = useState(false);
	const [reloadUser, setReloadUser] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [categories, setCategories] = useState([]);
	const db = firebase.firestore();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userAuth) => {
			if (userAuth) {
				setUser(userAuth);

				db.collection("users")
					.doc(userAuth.uid)
					.onSnapshot((snapshot) => {
						setUserInfo(snapshot.data());
					});

				setIsAuth(true);
			} else {
				setUser(false);
				setIsAuth(false);
			}
		});
	}, [user]);

	useEffect(() => {
		(async () => {
			await firebase.auth().currentUser;
		})();
	}, [reloadUser]);

	useEffect(() => {
		getCategories();
	}, []);
	const getCategories = () => {
		let catDoc = [];
		db.collection("categories")
			.get()
			.then((qs) => {
				qs.forEach((doc) => {
					catDoc.push({ id: doc.id, category: doc.data().category });
				});
			});

		setCategories(catDoc);
	};
	return (
		<FirebaseContext.Provider
			value={{
				user,
				db,
				firebase,
				isAuth,
				userInfo,
				categories,
				setReloadUser,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
}
