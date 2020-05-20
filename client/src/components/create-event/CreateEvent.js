import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectFieldGroup from '../common/SelectFieldGroup';
import { createEvent } from '../../actions/eventActions';

const sportList = ["Badminton", "Tennis", "Volleyball", "Basketball", "Baseball", "Running", "Table tennis", "Football", "Soccer"];

class CreateEvent extends Component{
    constructor(props){
        super(props);
        this.state = {
            nameofevent: '',
            typeofsport: '',
            numberofplayer: '',
            imageURL: '',
            location: '',
            start: '',
            description: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    
    onSubmit(e){
        e.preventDefault();
        
        const eventData = {
            nameofevent: this.state.nameofevent,
            typeofsport: this.state.typeofsport,
            numberofplayer: this.state.numberofplayer,
            imageURL: this.state.imageURL,
            location: this.state.location,
            start: this.state.start,
            description: this.state.description
        };
        
        this.props.createEvent(eventData, this.props.history);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    render(){
        const {errors} = this.state;
        
        return(
            <Grid container justify="center" className="marginX-1">
                <Grid item xs={12} sm={8} md={6}>
                    <Typography variant="h3" component="h1" align="center" gutterBottom>
                        Host Your Event
                    </Typography>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup
                            label="Event Name *"
                            placeholder="Event Name"
                            name="nameofevent"
                            type="name"
                            value={this.state.nameofevent}
                            onChange={this.onChange}
                            error={errors.nameofevent}
                        />
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <SelectFieldGroup
                                    label="Type of Sport *"
                                    name="typeofsport"
                                    type="name"
                                    value={this.state.typeofsport}
                                    onChange={this.onChange}
                                    sportList={sportList}
                                    error={errors.typeofsport}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldGroup
                                    label="Number of player *"
                                    placeholder="Number of player"
                                    name="numberofplayer"
                                    type="number"
                                    value={this.state.numberofplayer}
                                    onChange={this.onChange}
                                    error={errors.numberofplayer}
                                />
                            </Grid>
                        </Grid>
                        <TextFieldGroup
                            label="Image URL"
                            placeholder="Image URL"
                            name="imageURL"
                            type="name"
                            value={this.state.imageURL}
                            onChange={this.onChange}
                            error={errors.imageURL}
                        />
                        <TextFieldGroup
                            label="Location"
                            placeholder="Location"
                            name="location"
                            type="name"
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                        />
                        <TextFieldGroup
                            label="Date"
                            name="start"
                            type="date"
                            value={this.state.start}
                            onChange={this.onChange}
                            error={errors.start}
                        />
                        <TextAreaFieldGroup
                            label="Description"
                            placeholder="Details about this event"
                            name="description"
                            type="name"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                        />
                        <Button className="marginB-2" type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    event: state.event,
    errors: state.errors
});

export default connect(mapStateToProps, {createEvent})(withRouter(CreateEvent));