const RoomInfo = ({room}) => {
    return (
        <div className="tooltipster-base tooltipster-drrr tooltipster-fade tooltipster-fade-show" style={{ pointeEvents: 'auto', transitionDuration: '200ms', animationDuration: '200ms', width: '240px', minWidth: '100px', top: '0px', left: '0px' }}><div className="tooltipster-content">
            <div className="meta-wrap">{room.name}</div>
            {/* <div className="meta-wrap">
                <i className="region region-CN"></i>
                zh-CN
            </div> */}
            {/* <div className="meta-wrap opacity-05">7h, 55m, 2s</div> */}
            <div className="meta-wrap opacity-05">{room.description}</div>
            <hr />
            Thành viên : 
            {
                room?.members?.map((member,index) => (
                    <div key={index} className='avatar-wrap'>
                        <span className={member.theme.symbol}></span>
                        <span className="tripcode">{member.username}</span>
                        {/* <span className="icon icon-device-type icon-desktop"/> */}
                    </div>
                ))
            }

        </div>
            {/* <div className="tooltipster-arrow-top tooltipster-arrow" style={{ }}><span style={{borderColor:'rgba(21, 21, 21, 0.96)'}}></span></div> */}
        </div>
    )
}

export default RoomInfo