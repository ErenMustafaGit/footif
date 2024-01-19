import { useParams } from "react-router"
import { useFetchPlayerDetails } from "../../queries/queries"
import { useEffect } from "react";

export const Player = () => {
    const { wikiId } = useParams();
    const { isLoading, data, error } = useFetchPlayerDetails(wikiId ?? "");

    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '15px'}}>
            <div id="blocgauche" style={{ flex: '20%', minWidth: '100px' }}>
                <div>PHOTO</div>
                <div>
                    <h2>Main details</h2>
                </div>
            </div>
            <div id="blocdroit" style={{ flex: '80%', minWidth: '200px' }}>
                <h2>NOM</h2>
                <p>Vestibulum in mauris ut nulla consectetur accumsan dignissim in ante. Nam ut elit sodales, laoreet mauris blandit, facilisis magna. Aenean mattis quam lacus, vel dictum nulla malesuada quis. Donec ullamcorper tellus neque, id facilisis mauris interdum a. In vestibulum porttitor scelerisque. Donec nec augue rhoncus, eleifend lectus vel, eleifend mi. Nullam volutpat ex nec erat luctus convallis. Cras justo nunc, tempor sed augue maximus, euismod tempor magna. Ut vitae turpis quis nisi aliquet ultricies eu ut nibh. Donec in sapien vel enim sagittis porttitor at a odio. Nulla vel sapien in tellus sagittis accumsan ut in neque. Aliquam commodo, nisi dignissim varius semper, augue lectus sagittis nibh, vel consequat ipsum nibh nec justo. Quisque auctor et felis eu venenatis.</p>
                <div id="clubs">

                </div>
            </div>
        </div>
    )
}