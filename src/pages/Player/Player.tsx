import { useParams } from "react-router"
import { useFetchPlayerDetails } from "../../queries/queries"

export const Player = () => {
    const { wikiId = "" } = useParams();    
    const playerDetails = useFetchPlayerDetails(wikiId);
    const fullname = playerDetails?.data?.results?.bindings[0]?.name?.value;
    const abstract = playerDetails?.data?.results?.bindings[0]?.abstract?.value;
    const clubs = playerDetails?.data?.results?.bindings[0]?.clubs?.value;

    return (
        <div>
            <div id="blocgauche">
                <div>PHOTO</div>
                <div>
                    <h2>Main details</h2>
                </div>
            </div>
            <div id="blocdroit">
                <h2>{fullname}</h2>
                <p>{abstract}</p>
                <div id="clubs">
                    {clubs && clubs.map((club: string, index: number) => (
                        <p key={index}>{club}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}