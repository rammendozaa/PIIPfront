import activity from "./state/reducers/activity"

// ACTIVITY
export const NewActivity = (name, description, typeId, reference) => {
    return {
        name: name,
        description: description,
        typeId: typeId,
        reference: reference,
    }
}

export const ActivityInfo = (
    user_activity_id,
    user_activity_status_id,
    template_activity,
    activity,
    activity_progress
    ) => {
    return {
        user_activity_id: user_activity_id,
        user_activity_status_id:user_activity_status_id,
        template_activity: template_activity,
        activity: activity,
        activity_progress: activity_progress,
    }
}

/*
const Card = (rank, suit) => { return { rank: rank, suit: suit } }

const cardOne = Card('3', 'H')

cardOne // {rank: "3", suit: "H"}
cardOne.rank // "3"
cardOne.suit // "H"
*/