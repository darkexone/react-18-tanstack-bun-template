import type { Person } from "~/entities/person";

export type UsersPage = {
	users: Person[];
	total: number;
	skip: number;
	limit: number;
};

export type UseUsersInfiniteQueryOptions = {
	pageSize: number;
	skip?: number;
};

const SAMPLE_USERS: Person[] = [
	{
		id: 1,
		firstName: "Alicia",
		lastName: "Marquez",
		age: 29,
		visits: 45,
		progress: 60,
		status: "relationship",
	},
	{
		id: 2,
		firstName: "Elias",
		lastName: "Swanson",
		age: 34,
		visits: 32,
		progress: 80,
		status: "single",
	},
	{
		id: 3,
		firstName: "Priya",
		lastName: "Nakamura",
		age: 41,
		visits: 74,
		progress: 50,
		status: "complicated",
	},
	{
		id: 4,
		firstName: "Mireille",
		lastName: "DuPont",
		age: 26,
		visits: 19,
		progress: 90,
		status: "relationship",
	},
	{
		id: 5,
		firstName: "Jonah",
		lastName: "Solis",
		age: 38,
		visits: 53,
		progress: 20,
		status: "single",
	},
	{
		id: 6,
		firstName: "Kai",
		lastName: "Larsen",
		age: 21,
		visits: 14,
		progress: 40,
		status: "relationship",
	},
	{
		id: 7,
		firstName: "Oswaldo",
		lastName: "Rivera",
		age: 47,
		visits: 85,
		progress: 70,
		status: "single",
	},
	{
		id: 8,
		firstName: "Tessa",
		lastName: "Bennett",
		age: 33,
		visits: 28,
		progress: 15,
		status: "complicated",
	},
	{
		id: 9,
		firstName: "Helena",
		lastName: "Strauss",
		age: 52,
		visits: 92,
		progress: 45,
		status: "relationship",
	},
	{
		id: 10,
		firstName: "Marek",
		lastName: "Kowalski",
		age: 30,
		visits: 66,
		progress: 35,
		status: "single",
	},
	{
		id: 11,
		firstName: "Sky",
		lastName: "Vargas",
		age: 26,
		visits: 11,
		progress: 55,
		status: "relationship",
	},
	{
		id: 12,
		firstName: "Nadine",
		lastName: "Olsen",
		age: 37,
		visits: 44,
		progress: 95,
		status: "complicated",
	},
	{
		id: 13,
		firstName: "Fabian",
		lastName: "Ruiz",
		age: 44,
		visits: 67,
		progress: 25,
		status: "single",
	},
	{
		id: 14,
		firstName: "Rey",
		lastName: "Molina",
		age: 39,
		visits: 58,
		progress: 80,
		status: "relationship",
	},
	{
		id: 15,
		firstName: "Isla",
		lastName: "Cheng",
		age: 28,
		visits: 38,
		progress: 68,
		status: "complicated",
	},
	{
		id: 16,
		firstName: "Nico",
		lastName: "Meyer",
		age: 31,
		visits: 49,
		progress: 77,
		status: "single",
	},
	{
		id: 17,
		firstName: "Sana",
		lastName: "Hughes",
		age: 24,
		visits: 22,
		progress: 48,
		status: "relationship",
	},
	{
		id: 18,
		firstName: "Luca",
		lastName: "Giordano",
		age: 46,
		visits: 71,
		progress: 28,
		status: "complicated",
	},
	{
		id: 19,
		firstName: "Rhea",
		lastName: "Patel",
		age: 35,
		visits: 61,
		progress: 58,
		status: "single",
	},
	{
		id: 20,
		firstName: "Hiro",
		lastName: "Matsumoto",
		age: 27,
		visits: 33,
		progress: 64,
		status: "relationship",
	},
];

export function getMockUsersPage({
	pageSize,
	skip = 0,
}: UseUsersInfiniteQueryOptions): UsersPage {
	const users = SAMPLE_USERS.slice(skip, skip + pageSize);

	return {
		users,
		total: SAMPLE_USERS.length,
		skip,
		limit: pageSize,
	};
}
