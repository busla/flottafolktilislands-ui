'use strict';

var React = require('react');
var Kennitala = require('kennitala-js');

var config = require('./config.json')[process.env.NODE_ENV || 'development'];

var MunicipalityOption = React.createClass({
  render: function() {
    return (
      <option value={this.props.value}>{this.props.value}</option>
    );
  }

});
var HomeForm = React.createClass({

  getInitialState: function() {
    return {
      validSsn: false,
      validName: false,
      validEmail: false
    }
  },

  handleSubmit: function(e) {    
    e.preventDefault();  
    var name = React.findDOMNode(this.refs.name).value.trim();
    var ssn = React.findDOMNode(this.refs.ssn).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var municipality = React.findDOMNode(this.refs.municipality).value.trim();    
    var refugees = React.findDOMNode(this.refs.refugees).value.trim();
    var money = React.findDOMNode(this.refs.money).value.trim();
    var re = /\S+@\S+\.\S+/;    
    
    if (name !== '' && (re.test(email)) && municipality !== '' && ssn !== '') {
      this.props.onHomeSubmit(
        {
          name: name, 
          ssn: ssn,
          email: email,
          municipality: municipality,
          refugees: refugees,
          money: money
        }
      );  
    }
  
    React.findDOMNode(this.refs.name).value = '';
    React.findDOMNode(this.refs.nameGroup).classList.remove('has-success');
    React.findDOMNode(this.refs.nameGroup).classList.add('has-warning');
    React.findDOMNode(this.refs.nameGlyph).classList.add('glyphicon-warning-sign');

    React.findDOMNode(this.refs.ssn).value = '';
    React.findDOMNode(this.refs.ssnGroup).classList.remove('has-success');
    React.findDOMNode(this.refs.ssnGroup).classList.add('has-warning');
    React.findDOMNode(this.refs.ssnGlyph).classList.add('glyphicon-warning-sign');

    React.findDOMNode(this.refs.email).value = '';
    React.findDOMNode(this.refs.emailGroup).classList.remove('has-success');
    React.findDOMNode(this.refs.emailGroup).classList.add('has-warning');
    React.findDOMNode(this.refs.emailGlyph).classList.add('glyphicon-warning-sign');
  },

  changed: function(event){
    
    switch (event.target.id) {
      case 'ssn':
        if(!Kennitala.validate(event.target.value)) {
          React.findDOMNode(this.refs.ssn).value = '';
          this.setState({validSsn: false});
        }
        else {
          this.setState({validSsn: true});        
        };
        break;
      case 'name':
        if(event.target.value !== '') {
          this.setState({validName: true});
        }
        else {
          this.setState({validName: false});
        }

        break;
      case 'email':
        var re = /\S+@\S+\.\S+/;
        if(re.test(event.target.value)) {
          this.setState({validEmail: true});

        }
        else {
          React.findDOMNode(this.refs.email).value = '';
          this.setState({validEmail: false});
        };
        break;
    }
  },

  render: function() {
    var tbsClasses = {
      glyphWarning: "glyphicon glyphicon-warning-sign form-control-feedback",
      glyphOk: "glyphicon glyphicon-ok form-control-feedback",
      hasSuccess: "has-success form-group has-feedback",
      hasWarning: "has-warning form-group has-feedback",
    };

    var municipalitesList = [];
    for (var i = 0; i < MUNICIPALITIES.length; i++) {
      municipalitesList.push(<MunicipalityOption value={MUNICIPALITIES[i]} key={i}/>);
    }

    this.props.isCurrent ? 'active' : null
    return (

      <form>
        <div className={this.state.validName ? tbsClasses.hasSuccess:tbsClasses.hasWarning} ref="nameGroup">
          <label htmlFor="name">Nafn</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Fullt nafn" 
            id="name" 
            ref="name" 
            onBlur={this.changed} />
            <span 
            className={this.state.validName ? tbsClasses.glyphOk:tbsClasses.glyphWarning}
            ref="nameGlyph"></span>            
        </div>        
        <div className={this.state.validSsn ? tbsClasses.hasSuccess:tbsClasses.hasWarning} ref="ssnGroup">
          <label htmlFor="ssn">Kennitala</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Kennitala" 
            id="ssn" 
            ref="ssn" 
            onBlur={this.changed} />
            <span 
            className={this.state.validSsn ? tbsClasses.glyphOk:tbsClasses.glyphWarning}
            ref="ssnGlyph"></span>
        </div> 
        <div className={this.state.validEmail ? tbsClasses.hasSuccess:tbsClasses.hasWarning} ref="emailGroup">
          <label htmlFor="email">Netfang</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Netfang" 
            ref="email" 
            onBlur={this.changed} />
            <span 
            className={this.state.validEmail ? tbsClasses.glyphOk:tbsClasses.glyphWarning}
            ref="emailGlyph"></span>            
        </div> 
        <div className="form-group has-success" ref="municipalityGroup">
          <label htmlFor="municipality">Sveitarfélag</label>
          <select 
            className="form-control" 
            id="municipality" 
            ref="municipality" 
            defaultValue="Reykjavík">
            {municipalitesList}
          </select>            
        </div>                
        <div className="form-group">
          <label htmlFor="refugees">Fjöldi flóttamanna</label>
          <select 
            className="form-control" 
            id="refugees" 
            ref="refugees" 
            defaultValue="0">
              <option value="0">Get ekki hýst</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
          </select>          
        </div>
        <div className="form-group">
          <label htmlFor="months">Hversu marga mánuði getur þú hýst</label>
          <select 
            className="form-control" 
            id="months" 
            ref="months" 
            defaultValue="0">
              <option value="0">Get ekki hýst</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
          </select>          
        </div>              
        <div className="form-group">
          <label htmlFor="money">Mánaðarleg upphæð í sjóð</label>
          <select 
            className="form-control" 
            id="money" 
            ref="money" 
            defaultValue="1000">
              <option value="0">0 Kr. mun hýsa flóttamann</option>
              <option value="1000">1000 kr</option>
              <option value="1500">1500 kr</option>
              <option value="2000">2000 kr</option>
              <option value="2500">2500 kr</option>
              <option value="3000">3000 kr</option>
              <option value="3500">3500 kr</option>
              <option value="4000">4000 kr</option>
              <option value="5000">5000 kr</option>
              <option value="10000">10000 kr</option>
              <option value="20000">20000 kr</option>
              <option value="50000">50000 kr</option>
              <option value="100000">100000 kr</option>
              <option value="200000">200000 kr</option>
          </select>
        </div>     
        <button type="button" disabled={!this.state.validSsn || !this.state.validName || !this.state.validEmail} className="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit} value="submit">Skrá mig!</button>
      </form>
    );
  }

});


var Success = React.createClass({
  render: function() {
    if (this.props.done) {
      return (
        <div className="alert alert-success" role="alert"><strong>{this.props.alert}</strong></div>
      );          
    }
    else {
      return (
        null
      );
    };
  }

});

var App = React.createClass({

  getInitialState: function() {
    return {
      done: false,
      statistics: {},
    }
  },
  
  getStatistics: function() {
    $.ajax({      
          url: this.props.url+'/home/statistics',
          cache: true,
          success: function(data) {
            if (this.isMounted()) {              
              this.setState({statistics: data})
            }
          }.bind(this),

          error: function(xhr, status, err) {
          }.bind(this)
        });
  },

  componentDidMount: function() {    
    this.getStatistics();    
  },
  handleHomeSubmit: function(data) {
    $.ajax({
      url: this.props.url+'/home/create',
      dataType: 'json',
      method: 'POST',
      async: true,
      data: data,

      success: function(data) {
        this.setState({done: true});
        this.getStatistics();    
        
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  },

  render: function(){

    var alert = 'Skráningin þín tókst!';
    
    if (this.state.statistics.length === 0) {
      return (
        null
      );
    }
    else {  
      return(
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <h1 className="text-center">Björgum mannslífum</h1>
            <div className="panel panel-default">
              <div className="panel-body">
                <p>
                Undanfarnar vikur hafa hörmuleg örlög flóttafólks sem hafa reynt flýja stríðsástand og skapa sér framtíð í Evrópu varla farið fram hjá neinum.</p>
                <p>Á meðan Evrópulöndin reyna að koma ábyrgðinni hvert yfir á annað og loka landamærum sínum mun ástandið einungis versna. Við horfum nú upp á það að fólk sem flýr stríð í sínu heimalandi deyr við landamæri Evrópu.</p> 
                <p>Ísland hefur boðist til að taka við 50 flóttamönnum frá Sýrlandi á sama tíma og þau vísa flóttafólki úr landi sem komast hingað á eigin vegum. Þau þurfa húsaskjól og mat þar til þau hafa náð að koma undir sig fótunum. </p>
                <p>Þegar tölur eru bornar saman við önnur Evrópuríki er ljóst að stjórnvöld VILJA ekki taka við fleiri flóttamönnum. Íslensk stjórnvöld geta bjargað mannslífum með einu pennastriki. Það er nóg pláss, nógur matur og næg vinna til staðar.</p> 
                <p>Niðurstöðurnar úr þessari könnun mun varpa ljósi á hvar ábyrgðin liggur. Ef til þess kæmi að stjórnvöld myndu veita flóttamönnum dvalarleyfi, hvernig gætir þú hjálpað?</p>                
              </div>
            </div>
          </div>
            
          <div className="col-xs-12 col-sm-4">
            <h1 className="text-center">Skráning</h1>
            <HomeForm onHomeSubmit={this.handleHomeSubmit} validateForm={this.state.validForm}/>
          </div>
          <div className="col-xs-12 col-sm-4 text-center"> 
            <h1>Komið nú þegar</h1>
            <div className="row">
              <div className="col-xs-12">
                <div className="circle-tile ">
                  <a href="#"><div className="circle-tile-heading dark-blue"><i className="fa fa-money fa-fw fa-3x"></i></div></a>
                  <div className="circle-tile-content dark-blue">                    
                    <div className="circle-tile-number text-faded ">{this.state.statistics.totalMoney}</div>
                    <div className="circle-tile-description text-faded"> Krónur á mán.</div>
                  </div>
                </div>
              </div>   
            </div>            
            <div className="row">
              <div className="col-xs-12 ">
                <div className="circle-tile ">
                  <a href="#"><div className="circle-tile-heading red"><i className="fa fa-users fa-fw fa-3x"></i></div></a>
                  <div className="circle-tile-content red">
                    <div className="circle-tile-number text-faded ">{this.state.statistics.totalRefugees}</div>                
                    <div className="circle-tile-description text-faded"> Flóttamenn </div>
                  </div>
                </div>
              </div> 
            </div>
            <div className="row">
              <div className="col-xs-12 ">            
                <Success alert={alert} done={this.state.done} />                
              </div>        
            </div>        
          </div>        
        </div>        
      );
    };
  }
});

var MUNICIPALITIES = [
  'Sveitarfélag',
  'Hafnarfjörður',
  'Garðabær',
  'Álftanes',
  'Kópavogur',
  'Reykjavík',
  'Seltjarnarnes',
  'Mosfellsbær',
  'Mosfellsdal',
  'Kjalarnes',
  'Grindavík',
  'Hafnir',
  'Sandgerði',
  'Garður',
  'Keflavík',
  'Njarðvík',
  'Vogar',
  'Suðurnes',
  'Akranes',
  'Innnes',
  'Hvalfjörður',
  'Borgarnes',
  'Hvanneyri',
  'Kleppjárnsreykir',
  'Bifröst',
  'Hellissandur',
  'Rif',
  'Ólafsvík',
  'Grundarfjörður',
  'Stykkishólmur',
  'Búðardalur',
  'Vesturland',
  'Reykhólar',
  'Patreksfjörður',
  'Tálknafjörður',
  'Bíldudalur',
  'Þingeyri',
  'Flateyri',
  'Suðureyri',
  'Bolungarvík',
  'Ísafjörður',
  'Hnífsdalur',
  'Súðavík',
  'Drangsnes',
  'Hólmavík',
  'Vestfirðir',
  'Laugarbakki',
  'Hvammstangi',
  'Blönduós',
  'Skagaströnd',
  'Sauðárkrókur',
  'Varmahlíð',
  'Hólar',
  'Hofsós',
  'Norðurland',
  'Grímsey',
  'Siglufjörður',
  'Ólafsfjörður',
  'Dalvík',
  'Hrísey',
  'Litli-Árskógssandur',
  'Hauganes',
  'Lónsbakki',
  'Akureyri',
  'Kristnes',
  'Hrafnagil',
  'Brúnahlíð í Eyjafirði',
  'Svalbarðseyri',
  'Grenivík',
  'Laugar',
  'Húsavík',
  'Reykjahlíð',
  'Kópasker',
  'Raufarhöfn',
  'Þórshöfn',
  'Bakkafjörður',
  'Vopnafjörður',
  'Fellabær',
  'Borgarfjörður eystri',
  'Seyðisfjörður',
  'Egilsstaðir',
  'Neskaupstaður',
  'Eskifjörður',
  'Reyðarfjörður',
  'Fáskrúðsfjörður',
  'Stöðvarfjörður',
  'Breiðdalsvík',
  'Djúpivogur',
  'Nesjahverfi í Hornafirði',
  'Höfn í Hornafirði',
  'Austurland',
  'Kirkjubæjarklaustur',
  'Vík í Mýrdal',
  'Vestmannaeyjar',
  'Hvolsvöllur',
  'Hella',
  'Rauðalækur',
  'Byggðakjarni í Þykkvabæ',
  'Brautarholt á Skeiðum',
  'Flúðir',
  'Reykholt í Biskupstungum',
  'Laugarás',
  'Laugarvatn',
  'Sólheimar í  Grímsnesi',
  'Borg í Grímsnesi',
  'Selfoss',
  'Árbæjarhverfi í Ölfusi',
  'Tjarnabyggð',
  'Stokkseyri',
  'Eyrarbakki',
  'Hveragerði',
  'Þorlákshöfn',
  'Suðurland',
].sort();
MUNICIPALITIES.push('Útlönd');
console.log(config.API_URI);
React.render(<App url={config.API_URI} />, document.getElementById('app') );