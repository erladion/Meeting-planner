import React from 'react';
import { render } from 'react-dom';
import { SignIn } from '../components/googleSignin'

export class WelcomePage extends React.Component{
    render(){
        return (
            <div>
                <br/>
                <div className="w3-container">
                    <SignIn />
                    <p>This is Meeting Planner!
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit ultrices ultricies. Proin egestas ipsum id varius porta. Praesent viverra, mi ut ultrices luctus, ante felis aliquam quam, vitae cursus justo dolor a justo. Morbi pulvinar lorem eget vehicula posuere. Mauris imperdiet orci mi, et lobortis est eleifend ac. In placerat mauris id est blandit commodo. Nullam rutrum vehicula lacus ornare sollicitudin. Aliquam vitae hendrerit ante, in fringilla elit. Nunc egestas commodo sem, ac pretium felis tempor vel. Morbi in lorem ornare, pretium arcu sit amet, iaculis sapien. Quisque scelerisque libero quis lacus euismod, quis luctus massa aliquet. Donec aliquam orci sed justo aliquam bibendum. Cras sem magna, viverra id condimentum eu, vestibulum in erat. Nullam varius nibh vel est interdum laoreet. Curabitur a lorem sit amet nibh lacinia mollis at at lacus.

        Aliquam orci leo, hendrerit a consectetur at, euismod at metus. Curabitur pharetra justo quis lobortis vestibulum. Integer a nulla lorem. Phasellus tincidunt justo leo, nec rhoncus justo consectetur nec. Donec facilisis, risus non consequat porttitor, sem risus auctor ex, ac tristique dolor eros sed tellus. Suspendisse sed consequat velit, eget aliquet justo. Integer eget nibh volutpat, tincidunt dui ut, pretium nunc. Aenean tempor ex ac orci ullamcorper, et ultrices lacus pulvinar. In hac habitasse platea dictumst. Duis molestie libero quis est tempor convallis.
                    </p>
                </div>
            </div>
        );
    }
}
