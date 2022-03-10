import MarkdownRender from "../../MarkDownRender/MarkdownRender";
import './Problem.css'
//import Compiler from "../Compiler.js";
import Compiler2 from "./Compiler2";

function Problem() {
const html = `
The Government of Mars is not only interested in optimizing space flights, but also wants to improve the road system of the planet.
One of the most important highways of Mars connects Olymp City and Kstolop, the capital of Cydonia. In this problem, we only consider the way from Kstolop to Olymp City, but not the reverse path (i. e. the path from Olymp City to Kstolop).
The road from Kstolop to Olymp City is $$x$$ kilometers long.
Each point of the road has a coordinate $$x$$ ($$$0 \\le x \\le \\ell$$$), which is equal to the distance from Kstolop in kilometers. So, Kstolop is located in the point with coordinate $$$0$$$, and Olymp City is located in the point with coordinate $$$\\ell$$$.There are $$$n$$$ signs along the road, $$$i$$$-th of which sets a speed limit $$$a_i$$$. This limit means that the next kilometer must be passed in $$$a_i$$$ minutes and is active until you encounter the next along the road. There is a road sign at the start of the road (i. e. in the point with coordinate $$$0$$$), which sets the initial speed limit.If you know the location of all the signs, it's not hard to calculate how much time it takes to drive from Kstolop to Olymp City. Consider an example:
<img class="tex-graphics" src="https://espresso.codeforces.com/cc1184c34db41126a2efa5b2160e59b46fe1d225.png" style="max-width: 100.0%;max-height: 100.0%;" width="756px">Here, you need to drive the first three kilometers in five minutes each, then one kilometer in eight minutes, then four kilometers in three minutes each, and finally the last two kilometers must be passed in six minutes each. Total time is $$$3\\cdot 5 + 1\\cdot 8 + 4\\cdot 3 + 2\\cdot 6 = 47$$$ minutes.To optimize the road traffic, the Government of Mars decided to remove no more than $$$k$$$ road signs. It cannot remove the sign at the start of the road, otherwise, there will be no limit at the start. By removing these signs, the Government also wants to make the time needed to drive from Kstolop to Olymp City as small as possible.The largest industrial enterprises are located in Cydonia, so it's the priority task to optimize the road traffic from Olymp City. So, the Government of Mars wants you to remove the signs in the way described above.
`
    return (
        <>
            <div className="problem-container">
                <div className="problem-data">
                    <div className="info">
                        <h1>Problem A</h1>
                    </div>
                    <div className="description">
                        <MarkdownRender children={html} />
                    </div>
                </div>
                <div className="problem-execution">
                    <Compiler2/>
                </div>
            </div>
        </>
    );
}
export default Problem