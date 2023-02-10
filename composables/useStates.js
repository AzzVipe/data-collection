// export const useRealmApp = () => useState < string > ("realmApp", () => "pink");
// export default function useRealmApp() {
// 	const data = useState("realmApp", () => [
// 		{ id: 1, name: "test 1" },
// 		{ id: 2, name: "test 2" },
// 	]);

// 	return data;
// }

// export const useRealmApp = () => {
// 	useState("realmApp", () => [
// 		{ id: 1, name: "test 1" },
// 		{ id: 2, name: "test 2" },
// 	]);
// };

export const useRealmApp = () => {
	return useState("realmApp", () => {
		return [
			{ id: 1, name: "test 1" },
			{ id: 2, name: "test 2" },
		];
	});
};
