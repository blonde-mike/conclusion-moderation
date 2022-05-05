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