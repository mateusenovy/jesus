import React, { Component } from 'react';

import { Card, CardHeader, GridList } from 'material-ui';
import { Link } from 'react-router';

export default class AppBarComponent extends Component {

    constructor() {
        super();

        this.state = {
            menus: [{
                "title": "Organização",
                "link": "organization"
            }, {
                "title": "Congregação",
                "link": "congregation"
            }, {
                "title": "Parceiro do Reino",
                "link": "users"
            }]
        }
    }

    render() {
        return(
            <GridList cols={2} padding={10} cellHeight={'auto'} >
                {this.state.menus.map( (row, index) =>
                    <Card key={index} style={{padding: '20px'}} >
                        <Link to={{
                                pathname: row.link,
                                state: { showGoBack: true }
                            }}
                            style={{ textDecoration: 'none' }} >
                            <CardHeader
                                title={row.title} />
                        </Link>
                    </Card>
                )}
            </GridList>
        );
    }
}
