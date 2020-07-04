import Post from '@models/Post';
import './styles/less.less';
import json from './assets/json.json';
import logo from './assets/logo.png';
import xml from './assets/xml.xml';
import * as $ from 'jquery';
import './babel.js'

const unusedvar = 20;

const post = new Post('Webpack post title', logo);
$('pre').html(post.toString());

// console.log("Post to string: ", post.toString());
console.log("JSON: ", json);
console.log('xml', xml);

