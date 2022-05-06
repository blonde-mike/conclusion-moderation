const url: string = "http://127.0.0.1:5000/";

export async function getModerationByPerson(pid: string) {
    let moderation: Object = {};
    
    await fetch(url + "api/" + pid,
        {headers: {'Accept': 'application/json'}}
    )
    .then(response => response.json())
    .then(data => {
        moderation = data;
    });

    return moderation;
}

export async function createModeration(pid: string, eventType: string, moderator: any) {
    let moderation: Object = {};

    await fetch(url + `api/${pid}/${eventType}/moderator`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(moderator)
        }
    )
    .then(response => response.json())
    .then(data => {
        moderation = data;
    });

    return moderation;
}