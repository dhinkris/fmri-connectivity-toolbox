import React from "react";
import Circos from '../visualization/chart/Circos'

class CircosConnectivity extends React.Component {
    state={

    }
    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }
    
    render() {
        const {data} = this.props
        return (
            <>
                {
                    data && data.length>0? <Circos data={data} />: null
                }
            </>
        )
    }
}

export default CircosConnectivity