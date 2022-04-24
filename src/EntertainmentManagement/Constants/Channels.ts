export const channels = [
    'Brazzers',
    'Realitykings', 
    'Naughty America', 
    'Digital Playground', 
    'Babes Network', 
    'FakeHub', 
    'Mile High Media', 
    'SexyHub', 
    'Twistys Network', 
    'Dogfart Network', 
    '3rd Degree Films', 
    'TeamSkeet', 
    'PornWorld', 
    'Life Selector', 
    'Private',
    "Tonight's Girlfriend",
    "Newsensation"
];

export type VideoDetails = {
    viewId: number,
    actressName: string,
    actorName: string,
    channelName: string,
    videoTitle: string,
    duration: string,
    description: string,
    videoUrl: string,
    channelPageUrl: string,
    releaseDate: string,
    viewDate: string
}

export const getRowsBackgroundColor = (channel: string) => {
    if (channel === 'Brazzers') {
        return 'yellow';
    }

    if (channel === 'Realitykings') {
        return 'pink';
    }

    if (channel === 'Naughty America') {
        return 'lightcoral';
    }

    if (channel === 'Babes Network') {
        return 'greenyellow'
    }

    if (channel === 'Mile High Media') {
        return 'skyblue'
    }

    if (channel === 'Digital Playground') {
        return 'palegreen'
    }

    if (channel === 'SexyHub') {
        return 'silver'
    }

    if (channel === 'Twistys Network') {
        return 'mistyrose'
    }

    if (channel === 'Dogfart Network') {
        return 'darkgrey'
    }

    if (channel === '3rd Degree Films') {
        return 'darksalmon'
    }

    if (channel === 'TeamSkeet') {
        return 'lime'
    }

    if (channel === 'PornWorld'){
       return 'red';
    }

    if (channel === "Tonight's Girlfriend"){
       return 'deepskyblue';
    }

    return 'honeydew'
}