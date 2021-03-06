/*jslint node: true */
'use strict';

var mapPanelData = {
  map1: {
    description: "<p><b>Audience</b></p><p>Policy Makers / Academia</p><br><br><p><b>Question</b></p><p>Is it possible to feed a high population area such as Portland Oregon using alternative permaculture-based agricultural methods?</p><br><br><p><b>Basic Setup</b></p><p>Use a well-known permaculture farmstead as a model to apply to large-scale agricultural operations.</p><p>Calculate total land needed to supply average American caloric intake with average crops.</p><p>Use the buffer tool in a unique way to determine how much land directly outside city limits would be needed to produce the food needed.</p>",
    process: "<p><b>Map Creation</b></p><p>Imported the Portland Urban Growth Boundary and cut it out of the agricultural zoning area, using the Intersect Tool. </p><p>Used the Buffer Tool on the city boundary with an arbitrary buffer distance.</p><p>Clipped the new buffer zone with the agricultural zone.</p><p>Calculated the area of new buffer shape and compared with desired area output.</p><p>Exported process to a model.</p><p>Ran the model repeatedly with new input parameters until the desired area was achieved. This was done with a manual version of a \"binary search\" which is programming's way of performing a very efficient guess-and-check.</p><p>Exported map features to Adobe Illustrator and stylized using custom graphics.</p>",
    tools: "<p><b>Software</b></p><p>ArcMap</p><p>Adobe Illustrator</p>",
    data: "<p><b>American Fact Finder</b></p><p>census block groups spatial boundaries</p><p>census block groups population data</p><br><br><p><b>Oregon Spatial Data Library</b></p><p>Urban Growth Boundary</p><p>Oregon zoning spatial and landuse data</p><br><br><p><b>Multiple News Sources</b></p><p>Alternative agricultural yield</p><br><br><p><b>United States Health Authorities</b></p><p>Average American caloric intake</p>",
  },

}
