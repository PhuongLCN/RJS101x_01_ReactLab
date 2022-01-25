import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

const DishDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <div className="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>

    );
}
function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>               
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}
function RenderComments({ comments }) {
    if (comments != null) {
        const com = comments.map(co => {

            return (
                <div className='container'>
                    <li>{co.comment}</li><br />
                    <li>-- {co.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(co.date)))}</li><br />
                </div>
            )
        }
        );
        return (
            <ul className="list-unstyled">
                {com}
            </ul>
        )
    }
    else {
        return (<div></div>)
    }
}
export default DishDetail;