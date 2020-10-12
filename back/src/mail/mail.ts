exports.send = function (email, subject, content, name, callback) {
  const nodemailer = require('nodemailer')
  const smtpTransport = require('nodemailer-smtp-transport')

  const transporter = nodemailer.createTransport(smtpTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    secureConnection: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  }))
  
  let year = new Date().getFullYear()
  let mail = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>{{ title }} - MassiveMusic.fr</title><style type="text/css">/*<![CDATA[*/a{color:grey;text-decoration:underline}.color--11{background-color:#5e8ac7}.color--12{background-color:#577967}.color--13{background-color:#ab3129}.color--19{background-color:#82335c}.style{color:rgb(107,107,107)}.style__link{display:inline-block;margin-bottom:6px;border-radius:100px;color:white;text-decoration:none;margin-right:14px;align-items:center;padding:4px 10px}@import url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext);table{font-family:"Lato",Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;font-smoothing:antialiased}@media only screen and (max-width: 700px){.full-width-container{padding:0 !important}.container{width:100% !important}.header td{padding:30px 15px 30px 15px !important}.projects-list{display:block !important}.projects-list tr{display:block !important}.projects-list td{display:block !important}.projects-list tbody{display:block !important}.projects-list img{margin:0 auto 25px auto}.half-block{display:block !important}.half-block tr{display:block !important}.half-block td{display:block !important}.half-block__image{width:100% !important;background-size:cover}.half-block__content{width:100% !important;box-sizing:border-box;padding:25px 15px 25px 15px !important}.hero-subheader__title{padding:80px 15px 15px 15px !important}.hero-subheader__content{padding:0 15px 90px 15px !important}.title-block{padding:0 15px 0 15px}.paragraph-block__content{padding:25px 15px 18px 15px !important}.info-bullets{display:block !important}.info-bullets tr{display:block !important}.info-bullets td{display:block !important}.info-bullets tbody{display:block}.info-bullets__icon{text-align:center;padding:0 0 15px 0 !important}.info-bullets__content{text-align:center}.info-bullets__block{padding:25px !important}.cta-block__title{padding:35px 15px 0 15px !important}.cta-block__content{padding:20px 15px 27px 15px !important}.cta-block__button{padding:0 15px 0 15px !important}}/*]]>*/</style><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--></head><body style="padding: 0; margin: 0;" bgcolor="#eeeeee"><table class="full-width-container" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#eeeeee" style="width: 100%; height: 100%; padding: 30px 0 30px 0;"><tr><td align="center" valign="top"><table class="container" border="0" cellpadding="0" cellspacing="0" width="700" bgcolor="#ffffff" style="width: 700px;"><tr><td align="center" valign="top"><table class="container header"><tr><td> <br /> <a href="https://massivemusic.fr" style="font-size: 22px; text-decoration: none; color: #3f3f3f; text-transform: uppercase; font-weight: bold;"> <img src="https://massivemusic.fr/logo.png" style="height: 80px;"/> </a></td></tr></table><table class="container hero-subheader" border="0" cellpadding="0" cellspacing="0" width="620" style="width: 620px;"><tr><td class="hero-subheader__title" style="color: black!important; font-size: 18px; font-weight: bold; padding: 80px 0 15px 0;" align="left"> {{ title }}</td></tr><tr><td class="hero-subheader__content" style="font-size: 16px; line-height: 27px; color: #808080!important; padding: 0 60px 90px 0;" align="left"> {{ content }}</td></tr></table><table class="container" border="0" cellpadding="0" cellspacing="0" width="100%" align="center"><tr><td align="center"><table class="container" border="0" cellpadding="0" cellspacing="0" width="620" align="center" style="border-top: 1px solid #eeeeee; width: 620px;"><tr><td align="middle"></td></tr><tr><td style="color: #adadad; text-align: center; font-size: 15px; padding: 10px 0 60px 0; line-height: 22px;"> <br /> <br /><div class="styles"> <a href="https://massivemusic.fr/dubstep" class="style__link color--11"> DUBSTEP </a> <a href="https://massivemusic.fr/drumandbass" class="style__link color--12"> DRUM & BASS </a> <a href="https://massivemusic.fr/dub" class="style__link color--13"> DUB </a></div> <br /> <br /> <a href="https://massivemusic.fr/" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #727272;"> {{ year }} - MassiveMusic.fr </a> - <a href="mailto:contact@massivemusic.fr" target="_blank" style="text-decoration: none; border-bottom: 1px solid #d5d5d5; color: #727272;"> contact@massivemusic.fr </a> <br /> <br /></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>'
  subject = subject.replace(/{{ name }}/g, name)
  content = content.replace(/{{ name }}/g, name)
  mail = mail
    .replace(/{{ title }}/g, subject)
    .replace(/{{ content }}/g, content)
    .replace(/{{ year }}/g, year.toString())
  subject = subject
  var mailOptions = {
    from: '"MassiveMusic.fr" '+process.env.MAIL_USER,
    to: email,
    subject: subject,
    html: mail,
  }
  transporter.sendMail(mailOptions, function (err, info) {
    transporter.close()
    if (err) {
      callback(err, info)
    }
    else {
      callback(null, info)
    }
  })
}