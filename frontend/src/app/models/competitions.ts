import { Athletes } from "./athletes";
import { User } from "./user";

export class Competitions{
    sport: string;
    discipline: string;
    type: string;
    format: string;
    dateFrom: Date;
    dateTo: Date;
    gender: string;
    location: string;
    delegate: string;
    teams: Athletes[];
    finished: boolean;
}