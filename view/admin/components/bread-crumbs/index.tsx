import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setActiveMenu } from '../../../../reducer/menu/actions'

const Wrapper = styled.div`
    display: flex;
    position: absolute;
    left: 15vw;
    top: 10vh;
    // background: #fff;
    background:#F5F5F5;
    // box-shadow: 0 0 40px 0 rgba(82,63,105,.1);
    box-shadow: 0 0 100px 100pc #fff;
    border-radius: 3px; 
    width: 83vw;
    height: 5vh;
`

const Container = styled.div`
    // background-color: #f5f5f5;
    border: 0px solid rgba(245, 245, 245, 1); 
    border-radius: 4px; 
    display: flex;
    margin: 0.5vh 1.5vw;
    align-items: stretch;
    
`

const Span = styled(styled.span`
align-self: center;
text-transform: capitalize;
`)`
&:before {
    content:'/';
    font-weight: bold;
    padding: 0 0.5vw;
}
`


const BreadCrumbs: React.FC<any> = (props)=>{
const activeMenu = props.menu.active
const menuList = props.menu.data
const menuData: any = {}
if(menuList.length>0) {
    menuList.map((item: any, idx: any)=>{menuData[item.name]={parent: item.parent_name}})
}

const [hierarchy, setHierarchy] = useState<Array<JSX.Element>>([<Span></Span>])

useEffect(()=>{
    let haveParent: any, temp: any =[]
    if(activeMenu){
        temp.unshift(<Span>{activeMenu}</Span>)
        haveParent = Object.keys(menuData).filter((i: any)=>i===activeMenu)
        if(haveParent.length>0){
            haveParent = menuData[Object.keys(menuData).filter((i: any)=>i===activeMenu)[0]].parent
            haveParent !== "" && temp.unshift(<Span>{haveParent}</Span>)
        }
        setHierarchy(temp)
    }
}, [activeMenu])

    return(<Wrapper>
        <Container>
        {hierarchy}
        </Container>
    </Wrapper>)
}
const mapStateToProps = (state:any) => (state);

const mapDispatchToProps = (dispatch:any) =>
    bindActionCreators({
    setActiveMenu
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs);