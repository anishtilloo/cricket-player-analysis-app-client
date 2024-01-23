export type Player = {
    id?: number;
    playerName: string;
    physicals: unknown;
    mentalStats: unknown;
    characteristics: unknown;
    height: number;
    weight: number;
    basePrise: number;
    actualPrise: number;
    injured: unknown;
    fitnessScore: number,
    analysis: unknown,
    playerType: unknown,
    teamId: number,
    teamName: string,
}

export type ResponsePlayers = {
    success: boolean;
    message: string;
    data: Player[];
}

export type ResponsePlayer = {
    success: boolean;
    message: string;
    data: Player;
}