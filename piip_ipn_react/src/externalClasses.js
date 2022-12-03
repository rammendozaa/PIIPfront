import activity from './state/reducers/activity'

// ACTIVITY
export const NewActivity = (name, description, typeId, reference) => {
  return {
    name,
    description,
    typeId,
    reference
  }
}

export const ActivityInfo = (
  userActivityId,
  userActivityStatusId,
  templateActivity,
  activity,
  activityProgress
) => {
  return {
    userActivityId,
    userActivityStatusId,
    templateActivity,
    activity,
    activityProgress
  }
}

/*
const Card = (rank, suit) => { return { rank: rank, suit: suit } }

const cardOne = Card('3', 'H')

cardOne // {rank: "3", suit: "H"}
cardOne.rank // "3"
cardOne.suit // "H"
*/
