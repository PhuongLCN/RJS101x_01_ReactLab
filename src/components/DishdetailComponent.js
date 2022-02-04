import React,{Component} from 'react';
import {
    Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem,
    Modal, ModalBody, ModalHeader, Button, Row, Col, Label
} from "reactstrap"
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'
import {Control,LocalForm,Errors} from 'react-redux-form'
import "bootstrap/dist/css/bootstrap.min.css"

const required =(val) =>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len)
const minLength = (len)=>(val)=>(val)&&(val.length>=len)



class CommentForm extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            modalOpen:false
        }
    }

    handleToggle=()=>
    {
        this.setState(
            {
                modalOpen:!this.state.modalOpen
            }
        )
    }

    submitHandle=(values)=>
    {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));

    }
    render() { 
        return ( 
            <React.Fragment>
            <Button className="bg-white text-dark" onClick={this.handleToggle}><i className="fa fa-pencil fa-lg"></i>{' '}Submit Comment</Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.handleToggle}>
                <ModalHeader toggle={this.handleToggle}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(value)=>this.submitHandle(value)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                         >
                                         <option>1</option>
                                         <option>2</option>
                                         <option>3</option>
                                         <option>4</option>
                                         <option>5</option>
                                    </Control.select>
                                </Col>
                    </Row>
                    <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                        rows="6"
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required:'Comment Required'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                            <Col >
                                <Button type="submit" color="primary" >Submit</Button>
                            </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
         );
    }
}

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
                    <CommentForm />
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