export interface Player {
    img: string;
    name: string;
    speech: string;
    isDesignated?: boolean;
    assignedPlayer?: Player;
    isAssigned: boolean;
}
