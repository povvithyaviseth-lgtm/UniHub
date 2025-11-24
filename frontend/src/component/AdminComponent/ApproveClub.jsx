import { mainStyle, titleStyle, subtitleStyle, cardsWrapper} from "../../style/AdminApprovalStyle";
import { ClubApprovalPopup } from "./ClubApprovalPopUp";

export default function approveClub(){
    return (
        <main style={mainStyle}>
            <h1 style={titleStyle}>Admin Console</h1>
            <h2 style={subtitleStyle}>Waiting For Approval</h2>

            <div style={cardsWrapper}>

            {/*Club Holder*/}
            <ClubApprovalPopup
                name="Club name"
                img="Image"
                description="This is a description"
                tag="Tech"
            />

            </div>
        </main>
    )
}