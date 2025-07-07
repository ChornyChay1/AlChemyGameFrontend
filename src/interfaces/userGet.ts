
interface UserAdventureModel {
    user_id: number
    adventure_id: number
    current_topic_index: number
}

interface UserGet {
    id: number;
    username:number
    adventures: UserAdventureModel[];
    completed_adventures: UserAdventureModel[];
    rating: number;
    total_adventures: number;
    completed_adventures_count: number;
    progress_percentage: number;
}
export default UserGet