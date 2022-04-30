// ACTIVITY
export const NewActivity = (name, description, typeId, reference) => {
    return {
        name: name,
        description: description,
        typeId: typeId,
        reference: reference,
    }
}

export const ActivityInfo = (userActivityId, activityType, externalId) => {
    return {
        userActivityId: userActivityId,
        activityType: activityType,
        externalId: externalId,
    }
}
