module.exports = {
    getData: (req, res) => {
        let query = "SELECT * from `content`";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Current Content",
                content: result
            });
        })
    }
}