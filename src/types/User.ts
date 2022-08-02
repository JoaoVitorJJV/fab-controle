export type User = {
    id: number;
    nickname: string;
    status: string;
    senha?: string;
    adv: number;
    adv_motivo?: string;
    pat_id: number;
    token: string;
}