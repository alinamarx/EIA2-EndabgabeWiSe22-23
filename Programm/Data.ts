namespace Fireworks {

    export interface Rocket {
        size: string;
        color: string;
    }
    export interface Data {
        [category: string]: Rocket[];
    }

    console.log("data.ts")

    export let data: Data = {
    
        Rockets: [
            { size: "1", color: "#ffffff" },
            { size: "2", color: "#ffffff" },
            { size: "3", color: "#ffffff" },
            { size: "2", color: "#000000"}
        ]
    }

}