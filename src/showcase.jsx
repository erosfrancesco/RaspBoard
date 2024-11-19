import Tabs from "components/tabs";
import Accordion from "./components/accordion";

export default function Showcase() {
    return <div className="container mt-3">
        <h1>My Page</h1>
        <h2>Typography</h2>
        <p>Lorem ipsum text.</p>
        <div className="card">
            <div className="card-body">A card.</div>
            <Tabs />
        </div>
        <Accordion title="Hello">
            <p>Some buttons:</p>
            <button type="button" className="btn btn-primary">Primary</button>
            <button type="button" className="btn btn-primary" disabled>Disabled</button>
            <button type="button" className="btn btn-secondary">Secondary</button>
            <button type="button" className="btn btn-success">Success</button>
        </Accordion>

        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
                <caption>Hello world</caption>
            </table>
        </div>
    </div>
}