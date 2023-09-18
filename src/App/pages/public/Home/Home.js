import React from 'react';
import { Navbar, Nav, Carousel } from 'react-bootstrap';
import { Button, Card, CardMedia, CardContent, Typography, Grid, Paper, IconButton, TextField, List, ListItem } from '@material-ui/core';
import { Twitter, Instagram, Facebook } from '@material-ui/icons';
import Jumbotron from "../../../components/Boots/Jumbotron"; // Import relevant icons

function HomePage() {
  return (
      <div>
        {/* Header */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">CrowdPass</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/user/tickets">My Tickets</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            <Nav.Link href="/login">Login/Signup</Nav.Link>
          </Nav>
        </Navbar>

        {/* Hero Section */}
        <Jumbotron>
          <Typography variant="h4">Revolutionizing Ticketing with Blockchain</Typography>
          <Button variant="contained" color="primary" href="/events">Browse Events</Button>
        </Jumbotron>

        {/* Event Highlights */}
        <Grid container spacing={3}>
          {/* Sample Event Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                  image="/path/to/event/image.jpg"
                  title="Event Name"
              />
              <CardContent>
                <Typography variant="h6">Event Name</Typography>
                <Typography>Date, Time</Typography>
                <Button variant="contained" color="primary">Buy Tickets</Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more event cards as needed */}
        </Grid>

        {/* Testimonials */}
        <Carousel>
          <Carousel.Item>
            <Paper>
              <Typography>"This is the best ticketing platform I've ever used!"</Typography>
              <Typography>- Happy User</Typography>
            </Paper>
          </Carousel.Item>
          {/* Add more testimonials as needed */}
        </Carousel>

        {/* Footer */}
        <footer>
          <Typography variant="h6">About CrowdPass</Typography>
          <Typography>Our mission and vision...</Typography>
          <List>
            <ListItem><a href="/about">About Us</a></ListItem>
            <ListItem><a href="/faq">FAQ</a></ListItem>
            <ListItem><a href="/contact">Contact</a></ListItem>
          </List>
          <div>
            <IconButton color="primary" href="https://twitter.com/CrowdPass">
              <Twitter />
            </IconButton>
            <IconButton color="primary" href="https://instagram.com/CrowdPass">
              <Instagram />
            </IconButton>
            <IconButton color="primary" href="https://facebook.com/CrowdPass">
              <Facebook />
            </IconButton>
          </div>
          <TextField label="Subscribe to our newsletter" variant="outlined" />
          <Button variant="contained" color="primary">Subscribe</Button>
        </footer>
      </div>
  );
}

export default HomePage;
