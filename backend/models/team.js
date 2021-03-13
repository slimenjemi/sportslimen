const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: String,
    foundation: String,
    staduim: String,
    country: String
});
const team = mongoose.model('Team',teamSchema);
module.exports = team;