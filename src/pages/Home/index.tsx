import React from "react";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import "../../index.css";
import "./home.css";
import paragraphs from "./paragraphs";
class Home extends React.Component{

    render(){return(
        <FirebaseAuthConsumer>
            {({isSignedIn, user, providerId}) => {
                
                let name = isSignedIn ? user.displayName : "Visitor";
                return (
                    <>
                        <h1><b>Manuel & Paulina Farms</b></h1><br/>
                        <div>
                            <h1>Hi, <b>{name}</b></h1><br/>
                            <b>MP Farms</b> is currently under construction. Features to expect are <b/>
                            <ul>
                                <li>Shopping for honey and fresh produce.</li>
                                <li>Blogs</li>
                            </ul>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique senectus et netus et malesuada fames. Arcu dui vivamus arcu felis bibendum. Cursus sit amet dictum sit. Vel elit scelerisque mauris pellentesque. Malesuada fames ac turpis egestas. Amet mauris commodo quis imperdiet massa tincidunt nunc. Tellus at urna condimentum mattis. Varius sit amet mattis vulputate enim nulla aliquet. In massa tempor nec feugiat nisl pretium fusce id velit. Blandit cursus risus at ultrices mi tempus. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Odio aenean sed adipiscing diam. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Quis ipsum suspendisse ultrices gravida dictum. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Sit amet consectetur adipiscing elit duis. Sit amet mattis vulputate enim nulla.</p>

<p>Scelerisque viverra mauris in aliquam sem fringilla ut. Volutpat blandit aliquam etiam erat velit. Feugiat nisl pretium fusce id velit ut tortor. Neque egestas congue quisque egestas diam in. Pellentesque nec nam aliquam sem et tortor consequat id. Eget aliquet nibh praesent tristique magna sit amet purus gravida. Vitae elementum curabitur vitae nunc sed velit dignissim. Dis parturient montes nascetur ridiculus. Non consectetur a erat nam at lectus. Metus dictum at tempor commodo. Non curabitur gravida arcu ac tortor dignissim convallis. Consequat semper viverra nam libero justo laoreet sit. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Vel pharetra vel turpis nunc eget lorem dolor sed. Sit amet massa vitae tortor. Convallis aenean et tortor at risus. Sed tempus urna et pharetra pharetra massa massa ultricies mi.</p> 
                        {/* <img src={farmPicture} className="homePicture"/> */}
                        {paragraphs.map((p, index) => {
                           let paragraph = <p>{p.text}</p>;
                           let image = <div className="imageWrapper"><img src={p.picture} alt="paragraph visual" className="paragraphPicture"/></div>;
                           let odd = index % 2 !== 0;
                           if(odd){
                               return (
                                   <div className="paragraph">
                                       {paragraph}
                                       {image}
                                   </div>
                               )
                           }else{
                               return (
                                   <div className="paragraph">
                                       {image}
                                       {paragraph}
                                   </div>
                               )
                           }
                        })}
                    </>
                )
            }}
        </FirebaseAuthConsumer>
    )}

}
export default Home;