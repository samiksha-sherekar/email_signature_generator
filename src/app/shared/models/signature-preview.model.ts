import Design from "./design.model";
import { General } from "./general.model";
import { SocialMedia } from "./social.model";

export default interface ISignature{
    signID?: string;
    uid?: string;
    basicForm: General;
    socialMedia : SocialMedia;
    designForm : Design;
}