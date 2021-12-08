import React from "react";
import Model3D from '../visualization/model3D/Model3D'

class BrainVolume extends React.Component {
    state={

    }
    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }
    render(){
        const { data } = this.state
        return(
            <>
                {
                    data && data.length>0? <Model3D data={data} />: null
                }
            </>
        )
    }
}

export default BrainVolume;