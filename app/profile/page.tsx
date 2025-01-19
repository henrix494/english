
import { redirect } from 'next/navigation'
import { auth } from "../../auth"
import Stats from '@/components/Stats'
import { sql } from '@vercel/postgres'
import { Button } from '@nextui-org/button'
import GoBack from '@/components/GoBack'
export default async function Profile(){
    const session = await auth()
    if(!session?.user){
        redirect("/")
    }
    const {rows} = await sql`SELECT * from english_users_grades where user_id =${session?.user.id}`
   return<div> 
    <div className='text-center mt-10 mb-2'>
        <GoBack/>
        <h3>
            {session.user.email} Hello   !
        </h3>
        <h4 className='text-3xl font-bold'>
            Wellcome
        </h4>
        <h5 className='text-4xl mt-4'>
            Stats
        </h5>
        </div>
        <Stats session={session} rows={rows}/>
    </div>
}