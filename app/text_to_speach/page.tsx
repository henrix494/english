import Level_List from "@/components/Level_List";
import { SessionProvider } from "next-auth/react";

export default async function HomeTextToSpeach(){
    return     (
    <SessionProvider>
            <div>
                <Level_List/>
            </div>    
    </SessionProvider>
)
}