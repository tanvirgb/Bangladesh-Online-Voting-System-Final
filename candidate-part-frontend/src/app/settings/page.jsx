import { redirect } from "next/navigation";
import {auth} from "../auth";


async function SettingPage(){
    const session = await auth();
    if (!session) {
        redirect("/api/auth/signin");
    }
    return(
        <div>
            {
                session.user.role=='admin'?(<p>Authorized User</p>):(<p>You are Not Authorized to view this page</p>)
            }
            Settings Page
        </div>
    )
}

export default SettingPage;