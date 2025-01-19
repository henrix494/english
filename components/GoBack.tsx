"use client"
import { Button } from "@nextui-org/button";
import {useRouter} from "next/navigation"
export default function GoBack(){
    const router = useRouter()
    return <Button className="mb-5" type="button" onPress={() => {
        router.replace("/")
    }}>Go Back</Button>
}