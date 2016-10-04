---
title: Utilisation de GoogleMaps en Java
author: David On Laptop
layout: post
date: 2011-01-09T14:30:53+00:00
url: /2011/01/utilisation-de-googlemaps-en-java/
seo_follow:
  - 'false'
seo_noindex:
  - 'false'
categories:
  - Articles
tags:
  - geocoding
  - jambi
  - java
  - qt
  - webservice

---
## Introduction

Cet article s&#8217;adresse aux développeurs cherchant intégrer un système cartographique dans leur application Java. Vous trouverez ci-bas les résultats de mes recherches effectués lors de mes charges de laboratoire du cours [Analyse et Conception de Logiciel][1] [l&#8217;École de Technologie Supérieure (ÉTS)][2].

## Survol des possibilités étudiées

Voici un schéma qui résume les options possibles. La légende est la suivante : en vert les options faciles, en orange difficulté moyenne, en rouge non-recommandée, et en grisées les options non explorées lors de cette recherche.

<img src="/asset/2011/01/sommaire_gmap_options2.png" title="sommaire_gmap_options2" width="700" /> 

## Détails

Voici un tableaux résumant les entrées et sorties pour chacune des méthodes :

<table width="100%">
  <tr>
    <th>
      Méthode
    </th>
    <th>
      Entrées
    </th>
    <th>
      Sorties
    </th>
    <th>
      Autres compétences requises
    </th>
  </tr>
  
  <tr>
    <td>
      SWT
    </td>
    <td>
      JavaScript ou URL
    </td>
    <td>
      HTML
    </td>
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      DJ NativeSwing
    </td>
    <td>
      JavaScript ou URL
    </td>
    <td>
      HTML
    </td>
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      QT Jambi
    </td>
    <td>
      JavaScript ou URL
    </td>
    <td>
      HTML
    </td>
    <td>
      QT
    </td>
  </tr>
  
  <tr>
    <td>
      Projet Web
    </td>
    <td>
      JavaScript ou URL
    </td>
    <td>
      HTML
    </td>
    <td>
      HTML, CSS, Programmation serveur (PHP,JSP,etc.)
    </td>
  </tr>
  
  <tr>
    <td>
      Static Maps API + KML
    </td>
    <td>
      KML
    </td>
    <td>
      Image
    </td>
    <td>
    </td>
  </tr>
  
  <tr>
    <td>
      Static Maps API + HTTP
    </td>
    <td>
      String
    </td>
    <td>
      Image
    </td>
    <td>
      HTTP et (XML ou JSON)
    </td>
  </tr>
  
  <tr>
    <td>
      GWT
    </td>
    <td>
      String
    </td>
    <td>
      HTML
    </td>
    <td>
      Google Web Toolkit (GWT)
    </td>
  </tr>
  
  <tr>
    <td>
      Flash
    </td>
    <td>
      String
    </td>
    <td>
      Flash
    </td>
    <td>
      ActionScript (AS3)
    </td>
  </tr>
</table>

&nbsp;

### Navigateur web embarqué

Dans cette solution, il s&#8217;agit d&#8217;utiliser un des différents contrôles Web existants et d&#8217;incorporer carrément un navigateur web dans l&#8217;application. Par la suite il suffit d&#8217;utiliser JavaScript ou d&#8217;envoyer les bons paramètres dans l&#8217;URL pour afficher les directions.

Si j&#8217;avais construire une application de bureau professionnelle, je choisirait le [Maps API for Flash][3] (via Adobe Air) si possible car la librairie est très stable ou j&#8217;explorerais les possibilités avec le [Google Maps for Mobile][4] ([recommandé par Sun][5]) ou la [NASA World Wind][6] ([demos][7])

### QT Jambi

QT est une librairie graphique (_GUI framework_) c++, open source et multiplateforme (windows, mac, linux, mobile), développée par Nokia. QT Jambi est un &#8220;port&#8221; de la librairie QT pour Java. Pas besoin de QT pour utiliser QT Jambi, il suffit de télécharger les [bindings pour votre système][8] et le [QT Eclipse Integration for Jambi (Java) Plugin][9]. Notez que pour l&#8217;installation du plugin Eclipse sur Windows 64 bits, il faut télécharger les 2 fichiers mentionnés ci-haut en 32 bits.

Voir mon article précédent pour voir [comment utiliser QT Jambi dans Eclipse][10]

### Sortie HTML

L&#8217;avantage d&#8217;avoir une sortie HTML est qu&#8217;il est possible de ré-utiliser les widgets du site de Google Maps. Par contre, l&#8217;intégration d&#8217;un navigateur embarqué dans les applications de bureau (ie: traditionnelle) frôle le [bris de la license de Google][11]. Toutefois, cela est parfaitement légal pour la création d&#8217;un site internet.

### Maps Data API

J&#8217;ai perdu plusieurs heures infructueuses avec l&#8217;API officielle de Google ([Maps Data API][12], maintenant désuète). Les exemples officiels requièrent l&#8217;installation d&#8217;un grand nombre de librairies mal documentées &#8211; laissez-moi savoir si vous y arrivez. J&#8217;ai alors cherché pour un autre exemple qui me semblait complet (dont j&#8217;ai perdu l&#8217;adresse), mais sa compilation provoquait une erreur de signature dans l&#8217;appel d&#8217;une des classes de l&#8217;API.

### Point de départ pour la solution avec Microsoft

([source][13]) : Microsoft has a collaboration with USGS at <a rel="nofollow" href="http://terraserver-usa.com/">http://terraserver-usa.com/</a>. There is a <a rel="nofollow" href="http://terraserver-usa.com/webservices.aspx">freely available web service</a> with a <a rel="nofollow" href="http://terraserver-usa.com/TerraService2.asmx">WSDL</a>. You can use common Java WSDL binding libraries like <a rel="nofollow" href="http://ws.apache.org/axis2/">Axis</a> or <a rel="nofollow" href="http://cxf.apache.org/">CXF</a> to create java object to access the service.

### Static Maps API + HTTP

Voici un extrait de code pour cette solution :

```java
/**
 * Copyright (c) 2010, Maxime Caumartin, David Martineau
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the names of the developpers nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package ca.etsmtl.log210.laboratoire1.GIS;
import java.awt.Dimension;
import java.awt.Image;
import java.awt.Toolkit;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.LinkedHashMap;
import utilities.json.JSONArray;
import utilities.json.JSONException;
import utilities.json.JSONObject;
import utilities.json.JSONTokener;
import utilities.polylineEncoder.PolylineEncoder;
import utilities.polylineEncoder.Track;
import utilities.polylineEncoder.Trackpoint;
import ca.etsmtl.log210.laboratoire1.modele.GestionnaireGIS;
public class GoogleMapProvider implements GestionnaireGIS {
  private HashMap<String, String> chose = new LinkedHashMap<String, String>();
  private HashMap<String, String> autreChose = new HashMap<String, String>();
  private Dimension dimmensionCarte;
  private URL polyencodedMap;
  // [...]
  @Override
  public Image getImage() throws IOException, InvalidLocalisationException {
    StringBuffer b = new StringBuffer(50);
    Image img;
    for (String s : chose.keySet())
      b.append(s).append('\n');
    if ((img = cache.get(b.toString())) == null)
    {
    JSONTokener token = null;
    URL u;
    URLConnection c;
    try
    {
      Track t = new Track();
      for(int i = 0; i < getLieux().length-1; i++){
        u = new URL("http://maps.google.com/maps/nav?q=from:"+URLEncoder.encode(getLieux()[i], "UTF-8")+"%20to:"+URLEncoder.encode(getLieux()[i+1], "UTF-8"));
        c = u.openConnection();
        // Je suis un navigateur web et mon nom est Firefox 3.6
        c.setRequestProperty("User-Agent", "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2) Gecko/20100122 Fedora/3.6.1-1.fc13 Firefox/3.6");
        c.setRequestProperty("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        c.setRequestProperty("Accept-Language", "fr-ca,en;q=0.5");
        InputStreamReader ob = new InputStreamReader (c.getInputStream());
        token = new JSONTokener(ob);
        JSONObject o = new JSONObject(token);
        // Dans le protocole HTTP, 200 signifie que notre requete a ete executee avec succes
        if (o.getJSONObject("Status").getInt("code") != 200)
          throw new InvalidLocalisationException();
        JSONArray arrDep = o.getJSONArray("Placemark");
        JSONObject o1 = (JSONObject) arrDep.get(0);
        t.addTrackpoint(getTractPointFromJSON(o1));
        JSONArray dir = o.getJSONObject("Directions").getJSONArray("Routes")
          .getJSONObject(0).getJSONArray("Steps");
        for (int j = 0 ; j < dir.length(); j++)
          t.addTrackpoint(getTractPointFromJSON((JSONObject)dir.get(j)));
        t.addTrackpoint(getTractPointFromJSON((JSONObject)arrDep.get(1)));
      }
      HashMap<?, ?> hm = PolylineEncoder.createEncodings(t, 10, 1);
      polyencodedMap = new URL(generatePolyencodedMapURL(hm));
    }
    catch (JSONException e)
    {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
      img = Toolkit.getDefaultToolkit().createImage(polyencodedMap);
      cache.put(b.toString(), img);
    }
    return  img;
  }
  public String generatePolyencodedMapURL(HashMap<?, ?> hm) throws UnsupportedEncodingException{
    String polyEncURL;
    //"http://maps.google.com/maps/api/staticmap?sensor=false&size=800x800&markers=color:blue                     |label:D|H3C+1K3          &markers=color:blue                    |label:F|<Destination!>                     &maptype=roadmap&format=png32&path=weight:5                     |color:blue                  |enc"+hm.keySet().iterator().next().toString()
    polyEncURL = "http://maps.google.com/maps/api/staticmap?sensor=false&size=1280x1024&"+generatePolylineMarkers()+"maptype=roadmap&format=png32&path=weight:"+getLargeurChemin()+"|color:"+getCouleurChemin()+"|enc:" + hm.values().iterator().next().toString();
    return polyEncURL;
  }
  public String generatePolylineMarkers() throws UnsupportedEncodingException{
    String polyMarkers = "";
    for(int i = 0; i < getLieux().length; i++){
      polyMarkers = polyMarkers + "markers=color:"+getCouleurMarqueur()+"|label:"+this.chose.get(getLieux()[i])+"|"+URLEncoder.encode(getLieux()[i], "UTF-8")+"&#038;";
    }
    return polyMarkers;
  }
  private static Trackpoint getTractPointFromJSON(JSONObject o1) throws JSONException
  {
    JSONObject o2 = o1.getJSONObject("Point");
    JSONArray coor1 = o2.getJSONArray("coordinates");
    return new Trackpoint(coor1.getDouble(1), coor1.getDouble(0), coor1.getDouble(2));
  }
  @Override
  public String[] getLieux() {
    int i = 0;
    String [] tmpStringArray = new String[chose.keySet().size()];
    for (String s : chose.keySet())
      tmpStringArray[i++] = s;
    return tmpStringArray;
  }
  // [...]
}
```

## Références

  * [Google Maps Parameters (quoi passer dans l&#8217;URL)][14]
  * [Google Maps JavaScript API v3][15]
  * [Google Directions API][16]
  * [Google Static Maps API V2][17]
  * [Google Maps API Web Services][18]
  * [Service de conversion d&#8217;une adresse en KML][19]
  * [SWT Code Snippets][20]
  * [QT Jambi 4.5.2 Reference Documentation][21]
  * [QT Jambi 4.5.2 API][22]
  * [QT 4.7.1 Reference Documentation][23]
  * [QT 4.7.1 API][24]
  * [Tutorial: Google Maps with Java, GWT and Eclipse][25]
  * [DJ NativeSwing][26]
  * [Google Maps API for Flash][3]
  * [Google Maps for Mobile][4]
  * [NASA World Wind][6]
  * [MapQuest Developer Network][27]
  * [Microsoft Bing Maps Developer Resources][28]

## Crédits

Merci à Maxime de Caumartin pour la contribution de son code Java pour le GoogleMapProvider, et aux autres étudiants pour leurs contributions.


 [1]: https://cours.etsmtl.ca/log210/
 [2]: http://www.etsmtl.ca/
 [3]: http://code.google.com/apis/maps/documentation/flash/
 [4]: http://www.google.com/mobile/maps/
 [5]: http://www.java.com/en/java_in_action/google_maps.jsp
 [6]: http://worldwind.arc.nasa.gov/java/index.html
 [7]: http://worldwind.arc.nasa.gov/java/demos/
 [8]: http://sourceforge.net/projects/qtjambi/files/4.5.2/
 [9]: http://qt.nokia.com/developer/eclipse-integration
 [10]: /2010/02/how-to-use-qt-jambi-from-within-eclipse/ "How to use QT Jambi from within Eclipse"
 [11]: http://code.google.com/apis/maps/faq.html#mapsformobile
 [12]: http://code.google.com/apis/maps/documentation/mapsdata/
 [13]: http://stackoverflow.com/questions/996954/java-api-for-google-maps-or-similar
 [14]: http://mapki.com/wiki/Google_Map_Parameters
 [15]: http://code.google.com/apis/maps/documentation/javascript/
 [16]: http://code.google.com/apis/maps/documentation/directions/
 [17]: http://code.google.com/apis/maps/documentation/staticmaps/
 [18]: http://code.google.com/apis/maps/documentation/webservices/
 [19]: http://code.google.com/apis/maps/documentation/geocoding/
 [20]: http://www.eclipse.org/swt/snippets/
 [21]: http://doc.qt.nokia.com/qtjambi-4.5.2_01/com/trolltech/qt/qtjambi-index.html
 [22]: http://doc.qt.nokia.com/qtjambi-4.5.2_01/index.html
 [23]: http://doc.qt.nokia.com/4.7/index.html
 [24]: http://doc.qt.nokia.com/4.7/classes.html
 [25]: http://claudiushauptmann.com/tutorial-google-maps-with-java-gwt-and-eclipse.html
 [26]: http://djproject.sourceforge.net/ns/
 [27]: http://developer.mapquest.com/
 [28]: http://www.microsoft.com/maps/developers/web.aspx