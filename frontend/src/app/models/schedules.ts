import { Athletes } from "./athletes";

export class Schedules{
    sport: string;
    hour: string;
    date: Date;a
    round: string;
    gender: string;
    location: string;
    teams: Athletes[];
    finished: boolean;
}