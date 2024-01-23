type Coach = {
    name: string;
    experience: number;
}
  
export type Team = {
    id: number;
    teamName: string;
    ownerName: string;
    coach: Coach;
    netWorth: number;
}
  
export type ResponseTeams = {
    success: boolean;
    message: string;
    data: Team[];
}

export type ResponseTeam = {
    success: boolean;
    message: string;
    data: Team;
}