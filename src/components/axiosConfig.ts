import axios from 'axios';

export default axios.create({
  baseURL: 'http://chirper.hopto.org:3000/'
});
