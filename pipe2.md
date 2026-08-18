

<!-- Start of picture text -->
“eSA\TUT, Aa<br>i wh =] =} r<br>2 fn I &<br>aactafe ates |<br>WARANGAL<br><!-- End of picture text -->





<!-- Start of picture text -->
A\TUT,<br>A<br>: P<br>\ =| i rf<br>2 ih Ml »<br>anitafe afeie. |<br>WARANGAL<br><!-- End of picture text -->



# **DISSERTATION APPROVAL FOR M. TECH** 

This dissertation entitled **“Analysis of Multi-source Uncertainties in Hydrological Modelling for Flood Predictions”** submitted by **Badigunchala Prasanth (21CEM4R08)** is approved for the degree of **Master of Technology** in **Civil Engineering** with specialization in **Water Resources Engineering.** 

#### **Examiners** 

**______________________________** 

________________________ ________________________ 

#### **Supervisor** 

(Dr. Vema Vamsi Krishna) 

#### **Chairman** 

**____________________________** 

Date: 

Place: Warangal 

ii 

# **DECLARATION** 

I, **Badigunchala Prasanth** , bearing Roll No: **21CEM4R08,** hereby declare that the dissertation titled **“Analysis of Multi-source Uncertainties in Hydrological Modelling for Flood Predictions”** under the supervision of Dr. Vema Vamsi Krishna, is submitted in partial fulfilment of the requirements for the award of the Degree of Master of Technology in Civil Engineering with specialization in Water Resources Engineering. I declare that this written submission represents my ideas in my own words and where others’ ideas or words have been included, I have adequately cited and referenced the original sources. I also declared that I have adhered to all principles of academic honesty and integrity and have not misrepresented or fabricated or falsified any idea/data/fact/source in my submission. I understand that any violation of the above will be cause for disciplinary action by the institute and can also evoke penal action from the sources which have thus not been properly cited or from whom proper permission has not been taken when needed. 

##### **Badigunchala Prasanth** 

**Roll No: 21CEM4R08** 

**Date: _____________** 

iii 

# **ACKNOWLEDGEMENT** 

I would like to express my special thanks of gratitude to my esteemed supervisor **Dr. Vema Vamsi Krishna** , Assistant Professor, Department of Civil Engineering, National Institute of Technology, Warangal for his sustained interest, sincere guidance, constant supervision and encouragement in carrying out this project work. 

I extend my profound sense of gratitude to **Prof. T D Gunneswara Rao** , Head of the Civil Engineering Department, **Dr. Ajey Kumar Patel** , Division Head of Environment and Water Resources Engineering, and **Dr. Litan Kumar Ray** , Course Coordinator, Water Resources Engineering specialization, NIT Warangal, for their valuable support in ensuring the facilities to carry out my research work. 

I express my gratitude to all the faculty members of Water Resources Engineering specialization, **Prof. K V Jayakumar, Prof. P. Anand Raj, Prof. N V Umamahesh, Sri V N Kameswara Rao** , **Dr. Litan Kumar Ray** and **Dr. Manish Pandey** for sharing their valuable knowledge that helps in completion of this project within the limited time frame. 

I would like to thank Miss. D B Indhu, Mr. Ch. Mohammad Rafi and other research scholars in the Department of Civil Engineering, NITW, for their valuable suggestions and kind help in completion of this dissertation. 

Last but not the least, I would like to thank my family and fellow classmates Mr. B. Karthik and Mr. M. Rahul Bharadwaj who supported me in every possible way, despite of their busy works. 

##### **BADIGUNCHALA PRASANTH** 

**ROLL NO: 21CEM4R08** 

iv 

# **ABSTRACT** 

This study examined the impact of uncertainty in hydrological models on the reliability of predictions. Three hydrological models, HEC-HMS (modelled under lumped and semidistributed conditions), and GR4J (lumped model), were employed to simulate hydrological processes using India Meteorological Department gridded rainfall data and gauge station rainfall data. The analysis focused on input, model structure and parameter uncertainties, as well as their interactions and combined effects on the reliability and accuracy of the model predictions. Different ensemble combinations of predictions of these three models with the two input rainfall datasets and multiple model parameters, are analysed for the uncertainties and their interactions. The prediction intervals obtained from these ensemble predictions were used to quantify the uncertainty for analysing the reliability and precision of outputs of hydrological models. The analysis of the input uncertainty indicated that the HEC-HMS lumped model is more sensitive to the variations in input data resulting in larger prediction interval when only uncertainty due to input data is considered. It was also observed that the uncertainty in predictions due to the variability in the input data depends on the model structure. The model structure uncertainty assessment indicated that the combination of the three models yielded more reliable results as compared to two-model combinations but with reduced precision. The results indicate that the reliability and precision of gridded rainfall data-based ensembles was much better than those of gauge station data-based ensembles when only model structure uncertainty is considered. Further, the findings indicated that the semi-distributed HEC-HMS model had higher parameter uncertainty due to the consideration of spatial variability in modelling, resulting in increased predictive uncertainty. Conversely, lumped models showed a lower impact of parameter uncertainty on predictions. Ensembles of models utilizing gridded rainfall data were more precise but less reliable compared to those using gauge station data when only parameter uncertainty is considered. Combining parameter and input uncertainty showed higher uncertainty in the semi-distributed HEC-HMS model, highlighting the challenges associated with incorporating spatially distributed data. Furthermore, combining parameter and model structure uncertainty revealed that the ensemble of all three models yielded more reliable results but with reduced precision, with the semi-distributed HEC-HMS and GR4J models contributing significantly to the combined uncertainty. To enhance the reliability and accuracy of predictions, Bayesian Model Averaging method was employed to 

v 

assess the combined parameter, input, and model structure uncertainty, which improved predictive capabilities, suggesting its potential as a valuable tool in hydrological modelling. **Key words:** ensembles, uncertainty analysis, prediction intervals, reliability, precision 

vi 

# **TABLE OF CONTENTS** 

|**CERTIFICATE ……………………………………………...………………………………. i**|
|---|
|**DISSERTATION APPROVAL FOR M. TECH ………...…………………………...…….ii**|
|**DECLARATION ……………………………………………………..……………………. iii**|
|**ACKNOWLEDGEMENT ………………………………………………...…………….….iv**|
|**ABSTRACT …………………………………………………………………………………. v**|
|**TABLE OF CONTENTS …………………………………………………….………….….vi**|
|**LIST OF FIGURES …………………………………………..….………...…….……….... .x**|
|**LIST OF TABLES ………………………………………………………………...………...xi**|
|**1.**<br>**INTRODUCTION............................................................................................................ 1**|
|1.1<br>General ........................................................................................................................ 1|
|1.2<br>Uncertainties in Hydrological Modelling .................................................................... 3|
|1.2.1<br>Input Uncertainty ................................................................................................. 4|
|1.2.2<br>Parameter Uncertainty ......................................................................................... 4|
|1.2.3<br>Model Structural Uncertainty .............................................................................. 6|
|1.3<br>Need for Uncertainty Analysis .................................................................................... 7|
|1.4<br>Objectives of the Study ............................................................................................... 8|
|1.5<br>Organisation of Thesis ................................................................................................ 8|
|**2.**<br>**REVIEW OF LITERATURE ......................................................................................... 9**|
|2.1<br>Hydrological models ................................................................................................... 9|
|2.2<br>Uncertainties in hydrological modelling ................................................................... 10|
|2.3<br>Analysis of different sources of uncertainties ........................................................... 11|
|2.4<br>Summary of literature................................................................................................ 13|
|**3.**<br>**STUDY AREA AND DATA COLLECTION.............................................................. 14**|
|3.1<br>Study area .................................................................................................................. 14|



vii 

|3.2<br>Data Collection:......................................................................................................... 15|
|---|
|3.2.1<br>Precipitation data ............................................................................................... 15|
|3.2.2<br>Streamflow data ................................................................................................. 16|
|3.2.3<br>Temperature data ............................................................................................... 16|
|3.2.4<br>Physiographic data ............................................................................................. 17|
|3.2.5<br>Potential Evapotranspiration data ...................................................................... 17|
|**4.**<br>**METHODOLOGY ........................................................................................................ 18**|
|4.1<br>Hydrological Models ................................................................................................. 18|
|4.1.1<br>HEC-HMS model............................................................................................... 18|
|4.1.2<br>GR4J model ....................................................................................................... 19|
|4.1.3<br>Model calibration and validation ....................................................................... 20|
|4.2<br>Uncertainty analysis .................................................................................................. 21|
|4.3<br>Ensemble model cases ............................................................................................... 22|
|4.4<br>Generalized Likelihood Uncertainty Estimation (GLUE) ........................................ 24|
|4.5<br>Bayesian Model Averaging (BMA) method ............................................................. 26|
|4.6<br>Evaluation Indices ..................................................................................................... 29|
|**5.**<br>**RESULTS AND DISCUSSION .................................................................................... 31**|
|5.1<br>Calibration and Validation of Hydrological Models ................................................. 31|
|5.2<br>Input Uncertainty Analysis........................................................................................ 34|
|5.3<br>Model Structure Uncertainty Analysis ...................................................................... 37|
|5.4<br>Parameter Uncertainty Analysis ................................................................................ 40|
|5.5<br>Combined Parameter-Input Uncertainty Analysis .................................................... 44|
|5.6<br>Combined Parameter-Model Structure Uncertainty Analysis ................................... 47|
|5.7<br>Combined Parameter-Input-Model Structure Uncertainty Analysis ......................... 50|
|**6.**<br>**SUMMARY AND CONCLUSIONS ............................................................................ 53**|
|6.1 Summary and Conclusions ............................................................................................ 53|
|6.2 Limitations of the Study................................................................................................. 55|



viii 

|6.3 Scope for the Future Study ............................................................................................ 56|
|---|
|**REFERENCES ……………………………………………………………………………..57**|
|**VISIBLE OUTPUT ………………………………………………………………………...66**|



ix 

# **LIST OF FIGURES** 

|**Figure. No**|**Caption**|**Page.**|**No**|
|---|---|---|---|
|**Figure 1.1**|Schematic<br>representation<br>of<br>the<br>global<br>water<br>cycle<br>(https://www.sciencelearn.org.nz/image_maps/36-dynamic-and-<br>complex-the-global-water).||2|
|**Figure 3.1**|Location map and DEM of study area, Wardha sub-basin in the<br>Godavari River basin along with gauge stations and outlet<br>location.||15|
|**Figure 3.2**|Flood events observed at Bamni station from the observed daily<br>stream flow data measured from 01/01/1969 to 31/12/1995.||16|
|**Figure 4.1**|Methodology flowchart for multi-source uncertainty analysis||22|
|**Figure 5.1**|Observed and simulated hydrographs of three random events<br>(event1, event9 and event12) in all the 6 cases.||34|
|**Figure 5.2**|The observed streamflow, ensemble mean streamflow series and<br>the 95% prediction interval of the ensembles M1, M2 and M3 in<br>the event 1, event 9 and event 12.||36|
|**Figure 5.3**|The observed streamflow, ensemble mean streamflow series and<br>the 95% prediction interval of the ensembles from M4 to M11 in<br>the event 1, event 9 and event 12||39|
|**Figure 5.4**|Posterior distribution of HEC-HMS1 (Case-1 and Case-2), HEC-<br>HMS2 (Case-3 and Case-4) and GR4J model parameters (Case-<br>5 and Case-6).||41|
|**Figure 5.5**|95% Prediction interval, observed flows and ensemble mean<br>flows of the ensembles M1, M2 and M3.||46|
|**Figure 5.6**|95% Prediction interval, observed flows and ensemble mean<br>flows of the ensembles from M4 to M11.||49|
|**Figure 5.7**|95% Prediction interval, observed flows and ensemble mean<br>flows of the simple ensemble M12 and BMA probabilistic<br>predictions.||51|



x 

# **LIST OF TABLES** 

|**Table. No**|**Caption**|**Page.**|**No**|
|---|---|---|---|
|**Table 4.1**|List of HEC-HMS model parameters with their optimal ranges.||19|
|**Table 4.2**|List of GR4J model parameters with their optimal ranges.||20|
|**Table 4.3**|Calibration cases of different hydrologic models with two input<br>rainfall datasets.||21|
|**Table 4.4**|Ensemble cases for analysing parameter uncertainty and its<br>combination with input and model structure uncertainty in<br>hydrological modelling.||23|
|**Table 5.1**|Calibrated model parameters for the three hydrological models<br>using two different input datasets.||32|
|**Table 5.2**|Deterministic performance of the 6 modelled cases with<br>calibrated parameters.||33|
|**Table 5.3**|Uncertainty evaluation measures of the 95% prediction interval<br>for the ensembles M1, M2 and M3 to analyze input uncertainty.||35|
|**Table 5.4**|Deterministic evaluation measures comparing observed flows<br>and mean flows of the ensembles M1, M2 and M3.||35|
|**Table 5.5**|Uncertainty evaluation measures of the 95% prediction interval<br>for the ensembles M4 to M11 to analyze model structure<br>uncertainty.||37|
|**Table 5.6**|Deterministic evaluation measures comparing observed flows<br>and mean flows of the ensembles M4 to M11.||38|
|**Table 5.7**|Statistical measures of effective parameter sets of each of the<br>model parameter of HEC-HMS1, HEC-HMS2 and GR4J<br>models.||42|
|**Table 5.8**|Parameter uncertainty evaluation using 95% confidence intervals<br>for all the 6 simulation cases.||43|
|**Table 5.9**|Deterministic performance of simulated flows of all the 6<br>simulation cases.||44|
|**Table 5.10**|Combined parameter and input uncertainty evaluation using 95%<br>prediction intervals of M1, M2 and M3 ensembles.||45|
|**Table 5.11**|Deterministic performance of the mean simulated flows of the<br>M1, M2 and M3 ensembles.||47|



xi 

|**Table 5.12**|Combined parameter and model structure uncertainty evaluation<br>using 95% prediction intervals of ensembles from M4 to M11.|47|
|---|---|---|
|**Table 5.13**|Deterministic performance evaluation by comparing observed<br>flows and simple ensemble mean of ensembles from M4 to M11.|50|
|**Table 5.14**|Combined parameter and model structure uncertainty evaluation<br>using 95% prediction intervals of ensembles M12.|51|
|**Table 5.15**|Deterministic performance evaluation by comparing observed<br>flows and simple ensemble mean of ensemble M12 and BMA<br>ensemble.|52|



xii 

# **CHAPTER 01** 

# 1. **INTRODUCTION** 

## **1.1 General** 

Floods are one of the frequently occurring catastrophic natural disasters occurring every year across the world causing significant damage to the infrastructure, social well-being, as well as loss of life and displacement of the affected communities (Mohanty et al., 2020; Ray et al., 2019; Roy et al., 2019). Floods are caused due to a multitude of natural and human factors that includes short duration-high intensity rainfall, snowmelt, dam or levee failure, coastal storms, land use-land cover changes, climate change etc. (Jain et al., 2018). They contribute to nearly 30% of the total natural disasters that occur every year across the world. Rapid urbanization and unanticipated climatic change due to industrialization have severe impacts on the hydrologic cycle causing these extreme hydrologic events. Structural measures like embankments, levees, dams etc., are not fully capable of serving their purpose of flood control due to highly unpredictable nature of floods (Barbetta et al., 2016). The prevention and mitigation strategies like flood plain mapping, operational flood forecasting, early warning systems and evacuation plans, are some of the non-structural measures being adopted to minimize the impacts of floods (Mujumdar et al., 2021; Piadeh et al., 2022). Many researchers advocate various non-structural measures due to their cost effectiveness. 

These non-structural measures require the study of hydrological processes occurring in the environment. Hydrological models are mathematical representations of the water cycle (Figure 1.1) and the processes that influence the movement and behaviour of water in a watershed or 

1 



<!-- Start of picture text -->
DYNAMIC AND COMPLEX: THE GLOBAL WATER CYCLE<br>Water storage in the atmosphere<br>Pi aetati Sublimation= i Condensation<br>— eee Transpiration<br>~Spring MN Water storageain<br>—— oceans<br><!-- End of picture text -->

of flood modelling. Remote sensing data, such as satellite imagery and radar, provide valuable information on rainfall patterns, land cover, and surface water extent, improving the input data for hydrological models. High-resolution topographic data helps in accurately representing the terrain and flow paths, allowing for more detailed flood simulations. Real-time monitoring systems provide up-to-date information on river levels, rainfall intensity, and soil moisture conditions, enabling more accurate flood forecasting and timely emergency response. 

## **1.2 Uncertainties in Hydrological Modelling** 

Hydrological models are like simplified versions of the real-world system, and are designed based on many limitations and assumptions (Jain et al., 2018). However, the complex nature of hydrological processes, coupled with the limitations of the data and the models, introduces ambiguities into modelling results. These inaccuracies in the hydrological modelling can have several implications and impacts on the outcomes and applications of the models. Uncertainties in data, model structure, parameters, and future projections can diminish the reliability of hydrological model predictions. The presence of uncertainties makes it challenging to have complete confidence in the accuracy and precision of the model outputs. Uncertainties in hydrological modelling can introduce risks in decision-making processes related to water resources management that can lead to inaccurate assessments of water resources, potentially resulting in overestimation or underestimation of available water, which can impact water allocation decisions and long-term planning. Inaccuracies in modelling results in misleading predictions that can lead to inadequate preparedness or unnecessary panic, affecting emergency response efforts and resource allocation during extreme events like floods and droughts. The projections of future climate and their integration into hydrological models introduces uncertainties in climate change assessments which can impact the evaluation of potential impacts on water availability, streamflow patterns, and the vulnerability of water resources to climate change. Uncertainties in hydrological modelling can reduce the overall confidence in studies that rely heavily on model outputs. This includes studies related to watershed management, land-use planning, environmental impact assessments, and infrastructure design. Stakeholders may be less inclined to rely on model results if the uncertainties are not adequately addressed and communicated. These uncertainties occurring from various sources can be broadly categorized into input uncertainty, parameter uncertainty and model structure uncertainty, which need to be studied for their quantification to analyse the reliability and accuracy of model predictions. 

3 

### **1.2.1 Input Uncertainty** 

In hydrological modelling, input uncertainty arises from several sources, including measurement inaccuracies, limitations in data collection methods, spatial interpolation, assumptions in boundary and initial conditions, missing data, inherent variability in hydrological processes etc. One major source of input uncertainty is related to the precipitation data, watershed characteristics and streamflow data. 

Precipitation is a key input data given to the hydrological models to simulate other hydrological processes, but its measurement and accounting for spatial distribution are challenging. Uneven distribution of rain gauges and their sparse density leads to spatial uncertainty. Additionally, radar or satellite-based precipitation estimates can have inherent errors due to calibration issues or atmospheric conditions. Estimation of watershed characteristics is another significant source of input uncertainty. Hydrological models require information about the topography, soil properties, vegetation cover, and land use within a watershed. However, obtaining accurate and up-to-date information for these input data can be difficult and expensive. Estimations and assumptions are often made, which introduce uncertainty into the model results. Streamflow measurements are also subject to input uncertainty. Flow gauges may have limitations in their accuracy and precision, leading to errors in the observed streamflow data. Additionally, flow measurements are often taken at specific locations along a river, and extrapolating these measurements to the entire watershed introduces uncertainties related to spatial representativeness. 

To account for input uncertainty, hydrological modellers often use statistical techniques, such as probability distributions or Monte Carlo simulations, to generate multiple plausible scenarios. Sensitivity analyses are also performed to assess the impact of input uncertainty on model outputs. These approaches help quantify the uncertainty and provide a range of possible model results, enabling decision-makers to make informed choices considering the associated uncertainties. 

### **1.2.2 Parameter Uncertainty** 

The hydrological model parameters represent the characteristics of the hydrological system, such as soil properties, infiltration rates, evapotranspiration rates, and flow routing coefficients. These values are crucial in hydrological models as they directly influence the simulation of hydrological processes and the accuracy of model outputs. Parameter uncertainty in hydrological modelling refers to the uncertainty associated with the values assigned to various 

4 

parameters within the model. Obtaining precise and accurate parameter values can be challenging due to various reasons. 

1. Limited data availability: Hydrological models require data for calibration, which involves comparing model outputs to observed data and adjusting the parameters to minimize the differences. However, data availability may be limited, particularly in ungauged or data-scarce regions. This scarcity of data makes it difficult to accurately estimate parameter values. 

2. Temporal and spatial variability: Hydrological parameters often exhibit temporal and spatial variability. For example, soil properties can vary across a watershed, and the variability may change seasonally or over time due to land use changes or natural processes. Capturing this variability accurately is challenging and can lead to parameter uncertainty. 

3. Scale mismatch: Parameters estimated at one scale may not necessarily hold true at a different scale. For example, soil properties measured at a small plot scale may not represent the variability observed at the watershed scale. This scale mismatch introduces uncertainty when transferring parameter values between scales. 

4. Parameter estimation methods: Different methods are used to estimate hydrological parameters, such as field measurements, laboratory experiments, remote sensing, or expert judgment. Calibration techniques also influence the parameter uncertainty. Each method has its limitations and uncertainties, leading to variations in parameter values. 

5. Equifinality concept: Different parameter sets can result in similar model performance. This possibility of existence of multiple parameter values causes uncertainty in choosing a single best parameter value. 

To address parameter uncertainty, hydrological modellers employ techniques such as sensitivity analysis, parameter estimation methods (e.g., optimization algorithms), and uncertainty analysis. Sensitivity analysis helps identify the parameters that have the most significant impact on model outputs, allowing researchers to prioritize their efforts in obtaining accurate values for those parameters. Parameter estimation methods aim to optimize the parameter values based on available data, reducing the uncertainty. Uncertainty analysis provides a quantification of the uncertainty associated with parameter values, enabling the characterization of the range of possible model outcomes. 

5 

### **1.2.3 Model Structural Uncertainty** 

Model structural uncertainty in hydrological modelling refers to the uncertainty associated with the choice of model structure or formulation used to represent the hydrological processes. It arises from the inherent complexity of the hydrological system and the challenge of accurately capturing its dynamics within a mathematical model. Hydrological models come in various forms, ranging from simple conceptual models to complex physically-based models. Each model structure makes certain assumptions and simplifications about the processes involved, and these assumptions can introduce uncertainties in the model results. Model structural uncertainty can arise due to several reasons: 

1. Simplified representation of processes: Hydrological models often simplify or parameterize complex processes such as infiltration, evapotranspiration, and flow routing. These simplifications may not fully capture the complexities of the actual processes, leading to structural uncertainty. 

2. Ignored or poorly represented processes: Some hydrological models may exclude or inadequately represent certain processes that are relevant to the specific hydrological system being modelled. For example, a model might neglect the effects of groundwatersurface water interactions or lateral flow, which can result in uncertainties when simulating water movement. 

3. Spatial and temporal scale limitations: Hydrological models are often developed and calibrated for specific spatial and temporal scales. Extrapolating the model to different scales or applying it to different regions may introduce structural uncertainties. The hydrological processes and dominant controlling factors can vary across different scales, and models may not adequately capture these differences. 

4. Data limitations: The availability of data influences the model structure. Lack of data or limited data coverage may lead to simplifications or assumptions in the model, which can introduce uncertainties in the results. For example, if streamflow measurements are scarce, a model might rely heavily on rainfall-runoff relationships, which may not accurately represent the system's dynamics. 

Addressing model structural uncertainty involves several approaches. Model inter-comparison studies, where different models with different structures are applied to the same dataset, help assess the variability and performance of different model structures. Model calibration and validation against observed data are crucial to ensure that the selected model structure 

6 

represents the real-world system as accurately as possible. Overall, model structural uncertainty reminds us that hydrological models are simplifications of complex systems, and the choice of model structure should be carefully considered, taking into account the specific characteristics of the hydrological system being studied. 

## **1.3 Need for Uncertainty Analysis** 

Analysing different sources of uncertainties is crucial for several reasons: 

1. Robust Decision Making: Hydrological models are used to support various water resources management decisions, such as flood control, reservoir operation, and drought mitigation. Understanding the uncertainties associated with model outputs helps decision-makers make more informed and robust decisions. By quantifying the uncertainties, decision-makers can assess the range of possible outcomes and their associated probabilities, enabling them to consider different risk levels and evaluate the trade-offs between different management options. 

2. Improved Model Performance: Analyzing uncertainties can lead to improvements in the model itself. By identifying the potential sources of uncertainty, modellers can focus their efforts on improving the accuracy and reliability of those components. For example, if parameter uncertainty is found to be a significant source of variability in model results, more precise and reliable methods can be developed to estimate those parameters or additional data can be collected to reduce the uncertainty. 

3. Effective Communication: Hydrological modelling and its outputs are often communicated to a diverse range of stakeholders, including water managers, policymakers, and the public. Uncertainty analysis provides a means to communicate the limitations and confidence associated with the model predictions. Communicating uncertainties helps manage expectations and avoids misinterpretation of results. 

4. Risk Assessment and Planning: Hydrological modelling is instrumental in assessing and managing water-related risks, such as floods and droughts. Uncertainty analysis allows for a comprehensive understanding of the range of potential outcomes and associated probabilities. This information aids in risk assessment and planning for potential scenarios, allowing for the development of effective risk reduction and adaptation strategies. 

In summary, analyzing uncertainties in hydrological modelling provides valuable insights into the limitations and reliability of model predictions. It supports robust decision-making, 

7 

improves model performance, facilitates effective communication, aids in risk assessment and planning, and contributes to scientific research and model improvement. 

## **1.4 Objectives of the Study** 

The overall goal of this work is to comprehensively analyze and enhance our understanding of the uncertainties associated with hydrological modelling, which can ultimately contribute to more reliable and accurate predictions in water resource management and related fields. This includes investigating the input uncertainty arising from various rainfall datasets, examining the model structural uncertainty resulting from different hydrological models, exploring the parameter uncertainty and ultimately, assessing the combined impact of parameter, input, and model structural uncertainties. The overall aim of the study was divided into 4 objectives as shown below. 

1. To analyse the input uncertainty due to different rainfall datasets. 

2. To analyse the model structural uncertainty due to different hydrological models. 

3. To analyse the parameter uncertainty of different hydrological models. 

4. To analyse the combined parameter, input and model structural uncertainty. 

## **1.5 Organisation of Thesis** 

Chapter 1, the Introduction, provides a comprehensive overview of the thesis, outlining the significance of studying multi-source uncertainties in hydrological modelling. It establishes the research objectives and highlights the relevance and potential implications of the study. Chapter 2, the Literature Review, explores into existing theories, studies, and methodologies relevant to the present study. It critically evaluates the available literature to identify gaps in current knowledge and highlights the key contributions of previous research in the field. Chapter 3, Study Area and Data Collection, focuses on the description of the specific study area and the collection of relevant data that provides an in-depth understanding of the geographical context of the research. Chapter 4, Methodology, outlines the approaches, techniques, and models employed to analyse multi-source uncertainties. It describes the methodology in a step-by-step manner, explaining the basis behind each method and its application to the research objectives. Chapter 5, Results and Discussion, presents the findings of the research, organized according to the research objectives and, the analysis and outcome of the results, their interpretations are discussed. Chapter 6, Summary and Conclusion, provides a concise summary of the thesis, highlighting the key findings and their implications. It revisits the research objectives and evaluates the contributions of the study. 

8 

# **CHAPTER 02** 

# 2. **REVIEW OF LITERATURE** 

The present study focuses on the analysis of uncertainties from different sources to improve the reliability and accuracy of hydrological predictions in flood modelling. In this chapter, a comprehensive review of existing literature, relevant to the present study, has been performed for understanding the current state of knowledge, identifying research gaps and formulating research methodology. The detailed review of the literature is presented below. 

## **2.1 Hydrological models** 

Chow et al., (1988) described the hydrological cycle as a system with a set of connected components of precipitation, evaporation, transpiration, surface runoff, ground water flow, and other hydrological processes. Hydrological modelling plays a crucial role in simulating these processes and to understand the complex dynamics of water systems in assessing the impacts of various factors on the water resources management (Becker & Serban, 1990, Salis et al., 2019 and Takele et al., 2022). Hydrological models involve the use of mathematical and computational techniques to simulate the behaviour of water in the environment, including rainfall, runoff, evaporation, and streamflow (Vema et al., 2017; Horton et al., 2022). They serve as valuable tools for studying the hydrological cycle and are used for plethora of applications, which include flood modelling, watershed management, climate change studies, land use/land cover change studies etc. (Aragaw et al., 2021; Bian et al., 2021; Dwarakish & Ganasri, 2015; Tariku et al., 2020). Many researchers are using ensemble models: combination of multiple hydrological models, hybrid models, which use output of one model as an input to 

9 

other model and machine learning algorithms to accurately simulate the natural hydrological process (Cloke & Pappenberger, 2009; Davis et al., 2022; Ghaith et al., 2020; Kurian et al., 2020; Tamiru & Dinka, 2021; Wu et al., 2020). The hydrological models provide insights into the temporal and spatial variations in water availability, aiding in the identification of areas susceptible to floods and droughts. By employing hydrological models, researchers and water resource professionals can make decisions regarding water allocation, flood forecasting, and water supply management (Ghaith et al., 2020; Jain et al., 2018; Parvaze et al., 2022). Moreover, hydrological models facilitate the evaluation of different scenarios and help in assessing the potential impacts of climate change, land-use changes, and human interventions on the hydrological system (Yu et al., 2015). 

## **2.2 Uncertainties in hydrological modelling** 

While, hydrological modelling is a powerful tool, the failure to perfectly simulate the physical processes through modelling, inevitably results in uncertain predictions from the model output and it is important to acknowledge and address the inherent uncertainties associated with these models (Dong et al., 2013; Moges et al., 2021; Todini, 2004). Errors in measuring the input data, missing of data, interpolation techniques, conceptualization of natural hydrological processes, mathematical representation of physical watershed characteristics, optimization techniques etc., leads to uncertain model outputs. These uncertainties can propagate through the modelling process and affect the reliability and accuracy of the model outputs, thus impacting the decision-making in design of various hydraulic and water conservation structures (Haberlandt, 2010; Vema et al., 2020). This uncertainty is classified into two components, (i) aleatory uncertainty and (ii) epistemic uncertainty. The aleatory uncertainty is due to natural variability of the real-world system in space and time (Loucks et al., 2005). The epistemic uncertainty is due to the lack of knowledge and understanding of hydrological processes and other man-made assumptions. It is to note that aleatory uncertainty cannot be quantified and reduced, but epistemic uncertainty can be quantified and reduced through adoption of various techniques (Gong et al., 2013). The epistemic uncertainty can be broadly classified into parameter, input and model structure uncertainty (Baldassarre & Montanari, 2009; Mcmillan et al., 2012; Emam et al., 2018; Jain et al., 2018; Gupta & Govindaraju, 2023). Many researchers have developed different techniques to quantify the uncertainties in hydrological modelling, but still there is no well-defined methodology (Moges et al., 2021). Boelee et al., (2017) presented a brief review of different sources of uncertainties in hydrologic modelling 

10 

and different methods of their analysis. Each source of uncertainty depends either directly or indirectly on the other sources of uncertainties and this shows inter-relation between them. 

## **2.3 Analysis of different sources of uncertainties** 

The input uncertainty arises due to measurement inaccuracies, spatial interpolation, assumptions in boundary and initial conditions, missing data etc. (McMillan et al., 2011). Strauch et al., (2012) investigated the influence of input precipitation uncertainty in streamflow simulations using an ensemble of 4 different precipitation data sources. For each precipitation input model, they determined the best performing parameter set and their associated uncertainty ranges using Sequential Uncertainty Fitting (SUFI-2) algorithm and found out that the parameter uncertainty varied significantly depending upon the precipitation data source. Ajami et al., (2007) presented Integrated Bayesian Uncertainty Estimator (IBUNE) framework based on the Bayesian Total Error Analysis (BATEA), that accounts for input uncertainty explicitly. Input error-based models have been widely used to analyze the input uncertainty (Jiang et al., 2018; Jung et al., 2018; Li et al., 2018; McMillan et al., 2011). In these error-based models, noise is added to the input data, and the output from the model is evaluated to analyze the sensitivity of the output to input data. 

The uncertainty due to model parameters is due to their inability to represent actual physical characteristics of a watershed, errors in measurements, calibration methods, possibility of existence of several model parameters which are equally capable of producing similar model outputs etc. (Herrera et al., 2022). Beven & Binley (1992) introduced the Generalized Likelihood Uncertainty Estimation (GLUE) methodology, for parameter uncertainty quantification, that works on multiple sets of parameter values for calibration and uncertainty analysis. Many researchers found GLUE to be a simple and efficient method to study the uncertainties in model predictions (Beven & Freer, 2001; Blasone et al., 2008; LehbabBoukezzi et al., 2016; Maulidiani et al., 2018; Mirzaei et al., 2015; Ragab et al., 2020; Stedinger et al., 2008). Similarly, Vrugt et al. (2003) presented a Markov Chain Monte Carlo (MCMC) sampler, Shuffled Complex Evolution Metropolis (SCEM-UA) algorithm, to infer the posterior distribution of hydrologic model parameters to assess the parameter uncertainty. Several studies in the literature have adopted these techniques directly or through modification for parameter uncertainty quantification and evaluate the reliability of the models (Vrugt et al., 2008). For example, Pang et al., (2019) used the updated GLUE method, which estimates the parameter uncertainty by considering multiple objectives and multi-criteria decision analysis 

11 

to evaluate the reliability of flood forecasting models. These methods assume that the parameter uncertainty is solely responsible for the uncertainty in the model predictions and do not consider the input and model structure uncertainties explicitly. Yang et al., (2008) and Wu & Chen, (2015) quantified the parameter uncertainty in a distributed hydrological modelling framework, Soil and Water Assessment Tool (SWAT), comparing different algorithms - Sequential Uncertainty Fitting algorithm (SUFI-2), GLUE and Parameter Solution (ParaSol). In addition to these algorithms, Emam et al., (2018) used Particle Swarm Optimization (PSO) algorithm to analyse the uncertainty in hydrological modelling. Aitken et al., (2022) evaluated the Full Monte Carlo (FMC), Latin hypercube sampling and Multi-level Monte Carlo (MLMC), to compare the cost and robustness of these techniques for quantifying the uncertainties in flood inundation. 

Butts et al., (2004) has presented a comprehensive hydrological framework that enables the flexibility to choose from various model structures using a single modelling tool to study the model structure uncertainty.  The model structure uncertainty is generally assessed by adopting ensemble techniques to combine the outputs of different models (Georgakakos et al., 2004; Strauch et al., 2012; Troin et al., 2022). These ensembles may include the outputs of different member models or outputs of a model calibrated with different objective functions. Bayesian Model Averaging (BMA) method has been widely used to ensemble multi-model predictions to analyze the model structure uncertainty (Duan et al., 2007; Meira Neto et al., 2018; Moknatian & Mukundan, 2023; Shu et al., 2022; Sun et al., 2018). Dong et al., (2013) performed uncertainty analysis of multiple hydrological models using two different BMA schemes and different objective functions. This procedure was performed to compare the mean of predictions and prediction uncertainty interval generated by BMA approaches with that of individual models. 

While most of the studies have analyzed single source of uncertainty, some studies have developed and analyzed uncertainty from multiple sources. For instance, Ajami et al., (2007) and Li et al., (2018) analyzed parameter, input and model structure uncertainties in the hydrologic predictions using IBUNE. They used different parameter optimization algorithms to present parameter uncertainty, a normally distributed error multiplier to account for input uncertainty and used BMA scheme to analyze model uncertainty. Engeland et al., (2016) studied the effects of uncertainties due to parameters and input data that included precipitation, temperature and observed streamflow data. 

12 

## **2.4 Summary of literature** 

It is to note that majority of the earlier research works analyzed uncertainty from a single source, and only a few studies have shown impact of multiple sources of uncertainties in flood modelling simulations. Excluding or overlooking of potential sources of uncertainties leads to decisions that are less than optimal. Further, the inter-dependence and interaction between different sources of uncertainties is yet to be fully understood. Analyzing the interactions and relationship between different sources of uncertainty would aid in better assessment of uncertainty and prudent decision making. Many of the earlier works analyzed the input uncertainty using error models, which may not physically describe uncertainty from different input sources. Further studies on multi-model ensembles were ensembles of different models with different objective functions and the influence of the input data on the model structural uncertainty has not been analyzed. The aforementioned discussion suggests that uncertainty from various sources must be accounted and its influence on the hydrological model output must be assessed for reliable decisions. The present study is an attempt to quantify input, model structure and parameter uncertainty separately and then combined uncertainty, to study the interaction between different sources of uncertainty and their impacts on the model outputs. 

13 

# **CHAPTER 03** 

# 3. **STUDY AREA AND DATA COLLECTION** 

## **3.1 Study area** 

The Wardha basin, which is a sub-basin of Godavari River basin in India (Figure 3.1) is considered as study area. The study catchment covers an area of approximately 46242 km<sup>2</sup> , which is around 15.3% of the entire Godavari basin. The study area extends in three states of India i.e., Madhya Pradesh, Maharashtra, and Telangana. The longitude and latitude extent of the Wardha basin are 75.96<sup>0</sup> E to 79.43<sup>0</sup> E and 19.26<sup>0</sup> N and 21.87<sup>0</sup> N respectively. The elevation of the basin above MSL ranges from 166 m to 937 m. The sub-basin is characterized by a hilly and undulating terrain and is susceptible to floods due to its topography and climatic conditions. The streamflow of the combined Penganga and Wardha rivers is conveyed through the Wardha basin to the Pranahitha river, the largest tributary of the Godavari basin. The rainfall distribution in the Wardha basin is characterized by high variability and the basin receives 80% of the annual rainfall during monsoon season, which, usually lasts from June to September. According to the Godavari River Basin Report - version 2.0 issued by CWC & NRSC, (2014), the average annual rainfall measured over 34 years (1971-2004) is 946.6 mm. The average values of minimum and maximum temperatures of the basin are 9.4<sup>0</sup> C and 46<sup>0</sup> C respectively. The basin consists of large number of dams among all the sub-basins of the Godavari River. Morphometric and hypsometric studies have been conducted earlier in Wardha basin for watershed development (Pande et al., 2021) and prioritization of sub-basins (Manjare, 2017). Hydrological studies have focused on the estimation of river flow, the analysis of rainfall-runoff relationships, and the characterization of flood behaviour. 

14 



<!-- Start of picture text -->
75°0'0"E 90°0'0"E 75°0'0"E 80°0'0"E<br>N<br>coo. India yee: Godavari Basin j<br>o fl fo. o 7 5<br>—) \ \ S eu See —<br>ees Kilometers % S —— a $s Kilometers S<br>Q 215430 860 1,290 1,720 . 0 70 140 280 420 560 2<br>75°0'0"E 90°0'0"E _ 75°0'0"E 80°0'0"E r<br>2 76°0'0"E 77°0'0"E 78°0'0"E 79°O'O"E 2<br>ed5.eS°<br>NWardha Sub-Basin y a<br>Elevation - Legend<br>Value £” “ Ss<br>2 High : 937 . ° . = a Gauge stations<br>= Low : 166 ‘ 4 “Se =<br>N ah , = = nN e Outlet<br>aa<br>has eT | Wardha_sub_basin<br>5 ray ae 5 | Godavari_Basin<br>4 be ro i * ~ i<br>N ae 1 N<br>te ‘es =i | India<br>ees Kilometers<br>0 15 30 60 90 86120<br>76°0'0"E 77°0'0"E 78°0'0"E 79°O'0"E<br><!-- End of picture text -->

study. Since the study required the same period of rainfall events with both the datasets, the rainfall events were chosen from the year 1969 to 1995 based on the availability of gaugestation data. 

### **3.2.2 Streamflow data** 

The daily streamflow data from the outlet of the basin, which is the Bamni station, was collected from the India Water Resources Information System (WRIS) from the year 1969 to 1995 (https://indiawris.gov.in/wris/). The flood events were separated based on the streamflow threshold value of 8400 m<sup>3</sup> /s issued by CWC (Figure _3.2_ ). A total of 18 flood events were taken such that the rainfall data from gauge stations was available during those flood events. Out of 18 events, 10 events were used for calibration of the hydrological models using the observed streamflow data and the remaining 8 events were studied for validation. 



<!-- Start of picture text -->
25,000<br>20,000<br>15,000<br>10,000<br>5,000<br>0<br>Time (Days)<br>Daily streamflow at Bamni station Flood threshold<br>/s)<br>3<br>Discharge (m<br>1969 1970 1971 1972 1973 1974 1975 1976 1977 1978 1979 1980 1981 1982 1983 1984 1985 1986 1987 1988 1989 1990 1991 1992 1993 1994 1995<br><!-- End of picture text -->

**Figure 3.2:** Flood events observed at Bamni station from the observed daily stream flow data measured from 01/01/1969 to 31/12/1995. 

### **3.2.3 Temperature data** 

The IMD gridded data of minimum and maximum temperature of the Wardha basin was collected with a resolution of 1<sup>0</sup> X 1<sup>0</sup> from the year 1969 to 1995. This data was resampled to 0.25<sup>0</sup> X 0.25<sup>0</sup> resolution using bilinear interpolation technique for consistency in spatial resolution with rainfall data. 

16 

### **3.2.4 Physiographic data** 

The Shuttle Radar Topography Mission (SRTM) Digital Elevation Models (DEM) of 30 X 30m resolution, obtained from the United States Geological Survey (USGS) Earth Explorer <u>(https://earthexplorer.usgs.gov), was used to process the physiographic data like catchment</u> area, elevation and slope. 

### **3.2.5 Potential Evapotranspiration data** 

The daily potential evapotranspiration (PET) was estimated to calculate the net rainfall after meeting the evaporation losses, during the study period. The present study used the Thornthwaite method, using the daily minimum temperature, maximum temperature and elevation data, to calculate the PET. 

17 

# **CHAPTER 04** 

# 4. **METHODOLOGY** 

## **4.1 Hydrological Models** 

### **4.1.1 HEC-HMS model** 

The HEC-HMS model is a physically based hydrologic modelling software system developed by the Hydrologic Engineering Centre (HEC), US Army Corps of Engineers. The model is designed to simulate rainfall-runoff and routing processes of the hydrological cycle (Boukezzi et al., 2016). HEC-HMS has been widely used by engineers, hydrologists, and planners to develop flood control strategies, design stormwater management systems, and assess the impact of land use changes on water resources. The model consists of various methods to represent physical watershed processes like loss methods for computing infiltration, transformation methods for computing surface runoff, baseflow methods for computing subsurface flow and routing methods for open channel flow routing. The model also has the capability to simulate the process in varying spatial distributions, i.e., the model can be used to setup in lumped and semi-distributed frameworks. 

In the present study, the HEC-HMS model was used to simulate flood events by assuming entire study area as a single unit with constant parameters for the whole basin (lumped model) and also by dividing the study area into 3 sub-basins with each sub-basin having its own parameter set (semi-distributed). The lumped model is referred as HEC-HMS1 and the semidistributed model is referred as HEC-HMS2 in all the following sections. The Soil Conservation Service - Curve Number (SCS-CN) method was adopted to represent the loss 

18 

method to compute the infiltration losses, the direct runoff hydrograph was obtained using the SCS unit hydrograph method and Muskingum method was used to route the surface runoff. The parameters for these method include, SCS-CN, lag time, Muskingum routing parameters K and x. Constant monthly baseflow method was selected for sub-surface flows, which were obtained by taking the minimum monthly streamflow that contribute to sub-surface flow over 30 years’ period in both the models. The Muskingum method was selected for routing runoff in the semi-distributed HEC-HMS2 model setup. The detailed model description can be found in the HEC-HMS Technical Reference Manual (USACE, 2000). The parameters of the models and their optimal ranges were mentioned in the Table _4.1_ 

**Table 4.1:** List of HEC-HMS model parameters with their optimal ranges. 

|**S. No**|**HEC-HMS model parameters**|**Ranges**|
|---|---|---|
|**1**|SCS Curve Number|0 - 100|
|**2**|Lag time (min)|30 - 12000|
|**3**|Muskingum weighing factor – K (hr)|0.1 - 150|
|**4**|Muskingum storage-time constant - x|0.01- 0.5|



### **4.1.2 GR4J model** 

The GR4J model is a conceptual hydrological model that is used for estimating river flows assuming that the catchment behaves as a linear reservoir system. It was developed by researchers at the French National Institute for Agricultural Research (INRA) and is a lumped parameter model that represents the catchment as a single entity. The model is conceptualised with two storage units: production store and routing store. The daily rainfall data and the potential evapotranspiration data calculated using the Thornthwaite method, are given as input to the model. This input data is processed using the fixed empirical equations to simulate streamflow and actual evapotranspiration. When the actual rainfall (P) is greater than evaporation (E), the net rainfall (Pn) after meeting evaporation losses is divided between the production store (Ps) and the direct runoff (Pn-Ps) based on fixed empirical equations. The production store is known to be soil moisture accounting (SMA) store. The capacity of production store (mm) is represented by the parameter ‘X1’. The percolation leakage from production store combined with direct runoff to form total quantity of water (Pr) that reaches the routing function. This ‘Pr’ is divided into two flow components based on a fixed split i.e., 90% of ‘Pr’ is routed by a unit hydrograph, UH1, having a time base of ‘X4’ days, and then 

19 

routing store whose capacity (mm) is represented by the parameter ‘X3’. The remaining 10% of ‘Pr’ is routed by another unit hydrograph UH2 having a time base of ‘2*X4’ days. The output of these two flow components is subjected to a groundwater exchange term ‘F’ which is a function of groundwater exchange coefficient ‘X2’, capacity of routing store ‘X3’ and level in routing store ‘R’ which is updated by output of UH1 and ‘F’. Perrin et al., (2003) has provided the detailed description of the GR4J model and the modelled empirical formulae. The optimal ranges of the parameters were mentioned in the Table _4.2_ . 

**Table 4.2:** List of GR4J model parameters with their optimal ranges. 

|**S. No**|**GR4J model parameters**|**Ranges**|
|---|---|---|
|**1**|X1- Maximum capacity of the production storage (mm)|0 - 1000|
|**2**|X2- Groundwater exchange coefficient|-5 - 5|
|**3**|X3- Maximum capacity of the routing store (mm)|0 - 300|
|**4**|X4- Time base of unit hydrograph (days)|0.5 - 5|



### **4.1.3 Model calibration and validation** 

The three models (HEC-HMS1, HEC-HMS2 and GR4J) were calibrated using IMD gridded rainfall data and also with gauge station data resulting in six calibration cases as shown in the **Table** **_4_ .** **_3_** . As mentioned earlier, 18 flood events were considered in this study. A split-sample approach was used for model calibration and validation. Among the 18 events, 10 events were selected for calibration and 8 events were used for validation. An auto-calibration approach using AMALGAM (Vrugt & Robinson, 2007) as optimizer and multiple objective functions of minimization of Percentage Error in Peak Flows (PEPF) and Root Mean Square Error (RMSE) were considered. AMALGAM is a multi-algorithm, genetically adaptive multi-objective method that combines the two concepts of searching optimal parameters using simultaneous methods and the auto-evolutionary descendent creation that takes existing solutions and makes changes to them to create better solutions automatically (Ballinas-González et al., 2016). The parameters of the models were the decision variables in the optimization problem. 

20 

**Table 4.3:** Calibration cases of different hydrologic models with two input rainfall datasets. 

|**Calibration cases**|**Hydrological model**|**Precipitation dataset**|
|---|---|---|
|Case 1|HEC-HMS1|IMD gridded data|
|Case 2|HEC-HMS1|Gauge-station data|
|Case 3|HEC-HMS2|IMD gridded data|
|Case 4|HEC-HMS2|Gauge-station data|
|Case 5|GR4J|IMD gridded data|
|Case 6|GR4J|Gauge-station data|



## **4.2 Uncertainty analysis** 

Uncertainty from multiple sources was quantified and analysed for their influence on the hydrological model predictions. The uncertainty was quantified by using prediction intervals constructed under different ensemble cases, which provide a range of values that an observation is expected to fall within. In the present study, the assessment of multiple sources of uncertainties has been made in the order of input uncertainty, model structure uncertainty, parameter uncertainty, combined parameter-input uncertainty, combined parameter-model structure uncertainty and combined parameter-input-model structure uncertainty. The methodology flowchart is shown in the Figure 4.1 and the detailed methodology is described in the following sections. 

The input uncertainty was analysed by using ensemble of simulated flows of a hydrological model with different available rainfall datasets assuming that only input data be the source of uncertainty and uncertainty due to parameters and hydrological model was neglected. The model structure uncertainty was analysed by using ensemble of different models with same input rainfall data assuming that only hydrological model be the source of uncertainty and uncertainty due to input data and model parameters is neglected. The uncertainty due to model parameters was quantified and analysed by using prediction intervals of model outputs obtained from multiple parameter sets sampled from their initial ranges. Then, the effective parameter sets that were used for parameter uncertainty analysis were further used to analyse the interaction of parameter uncertainty with input and model structure uncertainty. The interaction between the model input and parameter uncertainty was analyzed using the effective parameters derived for different input data. The uncertainty due to combined parameter and model structure was assessed using the ensemble of outputs from different models with 

21 



<!-- Start of picture text -->
Input rainfall Hydrological Input rainfall<br>data-set1 Model setup data-set2<br>Poee<br>Initial parameter ranges 1 Latin Hypercube sampling<br>11<br>1 l<br>l!<br>I 1<br>HEC-HMS GR4J ; HEC-HMS GR4J ;<br>1I<br>I I<br>I I<br>Optimal Parameters Optimal Parameters i Effective Effective 1<br>parameter sets parameter sets<br>| eer Lbe--- ee ------!<br>! I ——_—_—_—-—-— ------+<br>I,Ensemble.models:for Ensemble.models:for , |,j<br>!<br>input uncertainty input uncertainty ; ! | Ensemble models for Ensemble models for | |<br>ee eee eet aI parameteruncertainty+ input parameteruncertainty+ input | |\<br>l1I<br>I! Ensemble models for model structure ; ;<br>; uncertainty |i Ensemble models for combined__.input, model \\<br>rrr crc cccc structure and parameter uncertainty analysis I<br>lee LLL I<br><!-- End of picture text -->

framework. Then, all the aforementioned ensembles were further analysed for combined parameter-input uncertainty (M1, M2 and M3) and combined parameter-model structure uncertainty (M4 to M11) as mentioned in the Table _4.4_ . The ensemble of all these cases was analysed for combined parameter, input and model structure uncertainty (M12). The ensemble M12 were constructed using simple ensemble technique and was further analysed using BMA ensemble method. The prediction intervals of all these ensembles cases were evaluated using uncertainty evaluation indices to analyse different sources of uncertainties. 

**Table 4.4:** Ensemble cases for analysing parameter uncertainty and its combination with input and model structure uncertainty in hydrological modelling. 

|**Uncertainty Type**|**Hydrological model**<br>**Precipitation dataset**|**Notation**|
|---|---|---|
||HEC-HMS1<br>IMD gridded data|Q1|
||HEC-HMS1<br>Gauge-station data|Q2|
|**Parameter**|HEC-HMS2<br>IMD gridded data|Q3|
|**Uncertainty**|HEC-HMS2<br>Gauge-station data|Q4|
||GR4J<br>IMD gridded data|Q5|
||GR4J<br>Gauge-station data|Q6|
||**Ensemble member combinations**|**Notation**|
||Q1 - Q2|M1|
|**Parameter + Input**<br>**Uncertainty**|Q3 - Q4|M2|
||Q5 - Q6|M3|
||Q1 - Q3|M4|
||Q1 - Q5|M5|
||Q3 - Q5|M6|
|**Parameter +**|Q1 - Q3 - Q5|M7|
|**Model Structure**<br>**Uncertainty**|Q2 - Q4|M8|
||Q2 - Q6|M9|
||Q4 - Q6|M10|
||Q2 - Q4 - Q6|M11|
|**Combined**|Q1 - Q2 - Q3 - Q4 - Q5 - Q6|M12|
|**Uncertainty**|Q1 - Q2 - Q3 - Q4 - Q5 - Q6|BMA|



23 

## **4.4 Generalized Likelihood Uncertainty Estimation (GLUE)** 

The GLUE method is a statistical approach used for parameter uncertainty analysis in hydrological modelling. It is based on the idea that there is no single set of parameters that can be regarded as the true or optimal set, but rather a range of possible sets of parameters that can simulate the observed data adequately. The method involves generating a large number of parameter-sets, consistent with prior knowledge of the parameters. 

The GLUE method follows a systematic approach to parameter uncertainty analysis, consisting of the following steps: 

1. Model Selection: Begin by selecting a suitable hydrological or environmental model that represents the system under study. The model should have parameters that need to be calibrated or estimated. 

2. Probability Distributions: Assign probability distributions to the model parameters to capture their inherent uncertainty. These distributions can be based on expert knowledge, previous studies, or data-driven estimation methods. 

3. Parameter Sampling: Generate multiple sets of parameter values by sampling from the specified probability distributions. Each set represents a distinct combination of parameter values. 

4. Model Simulation: Run the selected model using each set of parameter values to generate simulated output or predictions. The model output could represent various variables such as streamflow, groundwater levels, or pollutant concentrations. 

5. Model Evaluation: Compare the simulated model output with observed data using an appropriate objective function or performance metric. Common metrics include root mean square error (RMSE), Nash-Sutcliffe efficiency (NSE), or likelihood functions. 

6. Performance Threshold: Establish a threshold value for the chosen objective function or performance metric that signifies an acceptable level of model performance. Determining this threshold is often subjective and dependent on the specific application or research objectives. 

7. Behavioural/Effective Parameter Sets: Identify parameter sets that produce model simulations with performance values below the defined threshold. These parameter sets are considered "behavioural" and are retained for further analysis. 

24 

8. Uncertainty Analysis: Analyze the retained behavioural parameter sets to characterize the uncertainty associated with model parameters. This analysis can involve statistical summaries such as calculating means, variances, or percentiles of the parameter values. 

9. Model Predictions: Utilize the retained behavioural parameter sets to generate a range of model predictions or forecasts. This range represents the uncertainty in the model's output resulting from parameter uncertainty. 

10. Interpretation and Decision-Making: Interpret the results of the uncertainty analysis within the context of the specific research application. Consider the implications of parameter uncertainty for the reliability of model predictions or use them to inform decision-making processes. 

GLUE provides a comprehensive framework for exploring parameter uncertainty and capturing the range of potential model responses. By considering multiple plausible parameter combinations, it avoids the selection of a single "best" parameter set and instead quantifies the uncertainty arising from various parameter values. This approach contributes valuable insights for decision-making and enhances the understanding of the limitations and reliability of model predictions. 

In the present study, 25,000 parameter-sets, of each model parameter, were sampled from the assumed uniform prior distribution using the Latin Hypercube sampling technique. For each of the parameter set, the models were simulated and the performance was evaluated using the Nash-Sutcliffe coefficient (NSE) as the likelihood objective function, comparing the observed and simulated flows. Among these large number of parameter-sets, the parameter-sets that performed the top 1% in terms of NSE, evaluated for events (10 events) taken for calibration, were considered as the effective or behavioural parameter-sets. The NSE of the effective parameter sets are normalized and are used as probability weights. The simulated streamflow values were sorted in increasing order at each moment and the cumulative probability is calculated using the probability weights. The 95% confidence intervals of the parameter uncertainty plotted for the simulated flows and the posterior probability distribution of effective parameter sets are analyzed for parameter uncertainty. 



Here, 𝑄0𝑖 and 𝑄𝑠𝑖 are the observed and simulated flows respectively at time step ‘𝑖’ and 𝑄0 is the mean of the observed flows. 

25 

## **4.5 Bayesian Model Averaging (BMA) method** 

The BMA method is a statistical approach used in hydrological modelling to account for model structure uncertainty. This method involves the use of multiple models to represent the catchment response, each of which is characterized by a set of parameters. The models are weighted according to their predictive performance, and the resulting weighted average predictions are used to estimate the response of the catchment. The BMA method is based on Bayesian statistics, which involves the use of prior knowledge to make probabilistic inferences about the parameters of the model. The prior knowledge is combined with the observed data to update the probability distributions of the parameters, which are then used to construct the posterior distributions. The posterior distributions represent the uncertainty in the parameter estimates, given the observed data and prior knowledge. The advantage of BMA technique is that a better performing model will receive a higher weightage and a poor performing model will receive a lower weightage to the model predictions. Also, the technique has the ability to depict BMA variance as an uncertainty measure containing both between-model variance and within-model variance. The BMA method can be briefly described as follows. 

Let ‘𝑦’ be the streamflow variable that is to be forecasted (or predictand), the training data i.e., the observed streamflow having a data length ‘T’ be denoted by D = [𝑦1𝑜𝑏𝑠, 𝑦2𝑜𝑏𝑠,…, 𝑦𝑇𝑜𝑏𝑠] and _f_ = [𝑓1, 𝑓2, 𝑓3, … , 𝑓𝐾] be the ensemble of ‘𝐾’ mutually exclusive and exhaustive member model predictions. Initially, before having the knowledge of observed streamflow, the probability of the predicted streamflow occurring within the sample space of predicted streamflow can be given as: 



this probability, 𝑝 (𝑦), is referred to as BMA estimate. With the availability of knowledge of observed streamflow, the BMA estimate is adjusted to this available new information. The posterior distribution of BMA prediction _‘y’_ can be obtained as shown in Eq. 3. 



It indicates that the BMA prediction is weighted average of individual model predictions weighted by the likelihood of the individual model given the observed data. The term 𝑝(𝑓𝑘|𝐷) is called the posterior probability of the prediction ‘𝑓𝑘’ given the input observed streamflow ‘ _D_ ’, and it actually indicates the BMA weight ‘𝑤𝑘’. The term 𝑝𝑘 (𝑦|𝑓𝑘, 𝐷) indicates the 

26 

conditional probability of the prediction ‘𝑦’ conditional on the ‘𝑓𝑘’ and ‘ _D_ ’. The posterior mean and variance of the BMA prediction are given as follows. 



From the two terms of BMA variance (Eq. 5), the first term indicates the between-model 2 variance and the second term indicates the within-model variance. The variable ‘𝜎𝑘 ’ indicates the variance associated with the model prediction ‘𝑓𝑘’ with respect to the observation ‘ _D_ ’. The application of BMA scheme assumes the term 𝑝𝑘 (𝑦|𝑓𝑘, 𝐷) to be Gaussian distribution. Hence, both the modelled and observed streamflow are transformed closely to the Gaussian distribution by using Box-Cox transformation, considering the probability of streamflow error to be non-Gaussian. The BMA parameters represented by 𝜃 = [{𝑤𝑘, 𝜎𝑘2, 𝑘 =1, 2…, 𝐾}], are 

estimated by using Expectation-Maximization algorithm. The algorithm is to be performed iteratively until the difference between the likelihood values of successive iterations becomes less than or equal to a pre-defined tolerance limit. The log-likelihood function has been considered for computational simplicity and it is approximated as shown in Eq. 6. 



The detailed methodology of the Expectation-Maximization algorithm for estimating the BMA weights and variances of the models is described in the following steps. 

**1. Initialization of the algorithm:** The EM algorithm is to be initialized (Iter = 0) with equal model weights and variances for all the competing models as shown in Eq. 7 and 8, which are to be updated in the later stages. 



**2. Computation of the initial likelihood:** The log-likelihood function considered earlier in Eq. 5 is calculated using the initial model weights and variances as shown in Eq. 9. 

27 



**3. Execution of Expectation step:** The iteration step is incremented (i.e., Iter = Iter+1) and a latent variable ‘𝑧𝑘,𝑡’ is introduced whose values need to be estimated assuming it to be a missing data problem for all the competing models at all the time steps. This latent variable is calculated using Eq. 10. 



At any particular time-step, the k<sup>th</sup> member model having the best prediction is assigned with latent variable ‘𝑧𝑘,𝑡’ to be ‘1’ and the rest of the models are assigned with latent variable ‘𝑧𝑘,𝑡’ to be ‘0’. Hence, at any particular time step, only one model will achieve ‘ 𝐼𝑡𝑒𝑟 𝐼𝑡𝑒𝑟 𝑧𝑘,𝑡 ’ equals to ‘1’ and all other model will have a ‘𝑧𝑘,𝑡 ’ equals to ‘0’. This process is repeated for all the competing models at all the time steps. 

**4. Execution of Maximization step:** The initial BMA weights and variances are updated and the likelihood function value is estimated using the updated weights and variance. The BMA weight of a model becomes the ratio of sum of the latent variable values of all time steps ‘T’ to the total length of the time-series dataset. The updated BMA weight and the updated variance can be computed using Eq. 11 and Eq. 12 respectively. 



**5. Checking convergence:** The difference between the estimated likelihood value of the current iteration and its previous iteration; (𝑙(𝜃<sup>𝐼𝑡𝑒𝑟</sup> ) – 𝑙(𝜃<sup>𝐼𝑡𝑒𝑟−1</sup> )); is checked for convergence. The Expectation and Maximization steps are computed iteratively until the convergence reaches a pre-defined threshold. The obtained BMA weight and variance of each competing model, after the convergence of likelihood, are used to estimate 

28 

weighted ensemble mean, total variance of all the models and are used to generate the probabilistic predictions to analyze the reliability and accuracy of the BMA ensemble. 

## **4.6 Evaluation Indices** 

The deterministic performance of the mean streamflow simulations was evaluated using three statistical indices, Percentage Error in Peak Flows (PEPF), Root Mean Square Error (RMSE) and Percent Bias (PBIAS). PEPF is a measure of accuracy of estimated peak discharge. A low error percentage indicate high accuracy of peak flow simulation and vice versa. RMSE is also a common measure of accuracy of predictions and gives the overall magnitude of error in the predictions. A smaller value indicates the better performance of the model while a larger value indicates poor performance. PBIAS quantifies the average difference between the modelled and observed flows and is expressed as a percentage of mean of observed flows. These metrics evaluate the model performance based on the observed flows and simulated flows. The formulae for these indices are given as: 







where, (𝑄0)𝑚𝑎𝑥 and (𝑄𝑠)𝑚𝑎𝑥 are the observed and simulated maximum flows respectively and Q0i and Qsi are the observed and simulated flows respectively at time step ‘i’. 

In order to assess the uncertainty associated with the model output, a comprehensive evaluation was conducted using reliability performance measures. Three specific indices, namely the Containing Ratio (CR), Average Band Width (B), and Average Deviation Amplitude (D), were selected to thoroughly evaluate the reliability of the models employed. The Containing Ratio (CR) was utilized to determine the proportion of observed flow that falls within the corresponding prediction interval. By analyzing this ratio, we gain insights into the model's ability to accurately capture the observed values, thus providing a measure of its reliability. The Average Band Width (B) represents the width of the confidence interval, which indicates the range likely to contain the true value of a population parameter with a specified level of confidence. This index allows us to assess the uncertainty associated with the model's estimates and provides valuable information regarding the precision of the predictions. Furthermore, the 

29 

Average Deviation Amplitude (D) quantifies the average difference between the mean of the upper and lower prediction intervals and the corresponding actual value. This index serves as a metric to evaluate the model's accuracy in representing the variations observed in the data. A higher Containing Ratio (CR) value indicates a more reliable model, suggesting that the estimated values are likely to be accurate. On the other hand, lower values of Average Band Width (B) and Average Deviation Amplitude (D) indicate higher precision and reduced uncertainty within the model's predictions. By incorporating these reliability performance measures, the confidence bounds derived from the simulated streamflow can be evaluated. These measures significantly contribute to determining the level of confidence that can be placed in the estimated values, ultimately enhancing the overall reliability, precision, and accuracy of the model's output. The formulae for these indices are given as: 







where, ‘𝑛𝑐’ is the number of observed stream-flows covered within the confidence bounds out of total number of observed flows ‘𝑛’. 𝑞𝑢𝑖 and 𝑞𝑙𝑖 are the upper and lower interval of confidence band respectively and 𝑄𝑜𝑖 is the observed stream-flow at time ‘i’. 

30 

# **CHAPTER 05** 

# 5. **RESULTS AND DISCUSSION** 

## **5.1 Calibration and Validation of Hydrological Models** 

The models HEC-HMS1, HEC-HMS2, and GR4J were calibrated using the observed flow data from the catchment outlet. The HEC-HMS1 model was calibrated for the 2 parameters, while the HEC-HMS2 and GR4J were calibrated for 4 parameters each. All the three models were calibrated for both the input data i.e., gridded data and the gauge data, thus resulting in 6 model combinations as described in the Table 4.3. The calibration was performed using AMALGAM optimizer (Vrugt & Robinson, 2007) with the objective of minimizing PEPF and RMSE. The multi-objective optimization resulted in pareto-optimal solutions. Five solutions from the pareto-optimal set were selected based on the trade-off between the two objective functions. The five solutions were again compared graphically and through statistical performance measures, and the best solution was considered as the optimized parameter set. The optimized parameters, for each of the six cases, obtained from the AMALGAM optimizer are shown in the Table 5.1. 

31 

**Table 5.1:** Calibrated model parameters for the three hydrological models using two different input datasets. 

|**arameters**|**se 1**|**se 2**||**HEC**<br>**Case 3**|**-HMS**||**Case 4**||**arameters**|**GR**<br>**se 5**|**4J**<br>**se 6**|
|---|---|---|---|---|---|---|---|---|---|---|---|
|**P**|**Ca**|**Ca**|**S1/R1**|**S2/R2**|**S3/R3**|**S1/R1**|**S2/R2**|**S3/R3**|**P**|**Ca**|**Ca**|
|**CN**|29.4|49.4|39.8|44.9|87.6|33.9|39.2|76.9|**X1**|3.9|3.7|
|**Lag**|1388.7|2856.7|3790.2|1481.2|1753.4|2141.7|1170.6|1675.3|**X2**|0.5|0.9|
|**k**|-|-|24.5|64.5|11.8|61.2|11.8|22.4|**X3**|273.1|300|
|**x**|-|-|0.36|0.09|0.1|0.15|0.36|0.5|**X4**|1.2|1.1|



**Note:** The S1/S2/S3 and R1/R2/R3 mentioned in the above table represents the three sub-basins and reaches of semi-distributed HEC-HMS model respectively. 

The performance of the three models with two different inputs, for the calibration and validation events, is compared using PEPF, RMSE and PBIAS as shown in the Table 5.2 **.** The PEPF varied from 16.7% to 29.9% during the calibration events for all the models. The error in the peak flow estimation was observed to be lower in the validation period, with PEPF ranging from 13.5% to 21.5%. On the other hand, the RMSE of all the 6 models was observed to be comparatively less during the calibration period as compared to the validation period. A comparison of the models’ performance across the two input datasets indicates that the models using gridded precipitation data performed better as compared to the model using gauge data. The difference between the model simulations was found to be profound in the case of lumped models i.e., HEC-HMS1 and GR4J. In both the models, a significant decrease in performance was observed when gauge rainfall data was used as input. 

Further, a comparison of the hydrographs for both calibration and validation events, where 3 random events are selected (Figure 5.1), indicate that the models with input gauge data predicted higher peaks as compared to the models using gridded data. The higher flood peaks for the HEC-HMS1 and GR4J models with gauge data can be attributed to the higher rainfall in the input data. It is to note that there were only 4 gauge-stations with sufficient data in the entire catchment, while more than 50 grid points lie within the basin. The average rainfall for the basin in the lumped model was estimated using the Thiessen polygon method. The resulting average rainfall for each of the events and the maximum one-day rainfall were found to be 

32 

higher for the gauge data. This higher rainfall values of gauge data can be because of sparse rain-gauge density in the Wardha basin. The influence of the input data on the parameters can be observed in the difference in the optimal parameter values for all the models (Table 5.1). However, the difference in the performance and parameter values for the gridded and gauge data models was not significant in the semi-distributed model. The statistical indices, PEPF, RMSE, and PBIAS, and hydrographs were found to be similar for the Q3 and Q4 model predictions. While the results were similar, the performance of the Q3 was slightly better than the Q4 model predictions. 

**Table 5.2:** Deterministic performance of the 6 modelled cases with calibrated parameters. 

|||**Calibration**|||**Validation**||
|---|---|---|---|---|---|---|
|**Cases**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(m**<sup>**3**</sup>**/s)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(m**<sup>**3**</sup>**/s)**|
|**Q1**|16.7|2623.7|25.2|13.5|2514.9|21.9|
|**Q2**|29.9|3133.3|50.2|19.9|3156.8|54.1|
|**Q3**|16.2|2990.4|54.9|8.8|3050.2|59.1|
|**Q4**|18.4|3038.5|56.8|12.7|3125.7|63.0|
|**Q5**|13.4|2889.2|54.8|11.6|3020.1|61.5|
|**Q6**|27.6|2917|55.6|21.5|3169.5|65.20|



The results indicate that although the gridded data is derived using gauge data, gridded data is able to simulate more reliable and accurate model output. Further, by comparing the three models (HEC-HMS1, HEC-HMS2 and GR4J), in terms of PEPF, GR4J has better performance during calibration and HEC-HMS2 has better performance during validation. 

33 



<!-- Start of picture text -->
¥ x10* Event1 g x104 _Event9 . x104 Event 12<br>eaa<br>o—E oO - )<br>ey —£ £<br>HEC-HMS1_ ey By |<br>ra o i’ a<br>Bo: eS JIIN \ | =5,: y), £Iaeod, H YiV A \ON<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>x10* Event1 5 x104 _Event 9 x104 Event12<br>aaa<br>o<br>E .<br>iS oO oO<br>HEC-HMS2_ z 5 a] |<br>S } \ SFE N\ i& . \<br>aa 0 SPWY be. 2a 0 INN aa A x<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>r x10* Event1 4 x10* _Event9 P x10* Event 12<br>z a a<br>oO oo tye] k<br>iEE<br>o<br>fi<br>m4 oO4 ~ oOa ,<br>GR4J f=)£& y\AN £&a 4 ‘ £ a ——_} i \<br>—0o<br>010 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>——— Simulated flows with gridded data ——— Simulated flows with gauge data —-— Observed Flows<br><!-- End of picture text -->

**Table 5.3:** Uncertainty evaluation measures of the 95% prediction interval for the ensembles M1, M2 and M3 to analyze input uncertainty. 

|||**Calibration**<br>|||**Validation**<br>||
|---|---|---|---|---|---|---|
||**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|
|**M1**|71.87|4813.19|2105.11|76.30|5080.92|2130.24|
|**M2**|40.11|3260.04|2372.49|46.74|3652.38|2421.11|
|**M3**|49.60|3583.82|2041.07|51.92|4207.90|2472.67|



Among the three ensemble models for input uncertainty, i.e., M1, M2 and M3, the prediction intervals for M1 model had the highest containing ratio of 71.9% and 76.3% in the calibration and validation events respectively. However, the average band width was also high for the M1 model, with 4813.2 and 5080.9 m<sup>3</sup> /s for the calibration and validation events respectively. On the other hand, the outflow hydrographs and the prediction intervals for the M2 and M3 were less spread with lower average band width, but also with lower containing ratio. Ideally, the containing ratio should be as high as possible with lower band width. It is evident from the Figure _5.2_ of the three events considered earlier, that the uncertainty in the ensemble member M1 is comparatively more than M2 and M3. The M1 and M3 model are the lumped HEC-HMS and GR4J models with input from the gridded and gauge data. A comparison of the M1 and M3 models indicate that the HEC-HMS1 model is more sensitive to the input variability as compared to the GR4J model. Further it is observed that the M2 model, which is the semidistributed HEC-HMS model, do not reflect the rainfall variability in the output hydrographs as the lumped HEC-HMS model, i.e., M1. 

**Table 5.4:** Deterministic evaluation measures comparing observed flows and mean flows of the ensembles M1, M2 and M3. 

|||**Calibration**|||**Validation**||
|---|---|---|---|---|---|---|
||**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|
|**M1**|22.91|2683.06|50.21|14.02|2563.36|54.13|
|**M2**|16.92|2860.57|63.58|9.33|2956.37|71.91|
|**M3**|16.83|2522.97|53.16|15.61|2948.02|69.54|



35 



<!-- Start of picture text -->
2 x104 Event1 2 x104 Event9 2 x104 Event 12<br>@ Q a<br>to) cr) Cr) A<br>£ E E<br>M1 ray21G o2.4© rayp4G h<br>f= & A =<br>a 4) 0 ra<br>0 Ces eaaxi 4 0 : 0 arte<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>5 x10* Event4 4 x104 _Event9 2 x104 Event 12<br>M2 oO o oO<br>21 P14 24<br>wo i sj<br>= f < iS<br>0 lt a O lle<br>0 — 0 : . 0“<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>: x10* _ Event4 . x104 _Event9 7 x10* Event 12<br>* > > i<br>7] Ww Ww<br>"ta5 J a51 ARNe ra57 Ne:<br>0 seseaaaad 0 A) 0 rns:<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>[-}95% Prediction Interval © Observed Flows ———Ensemble Mean Flows<br><!-- End of picture text -->

## **5.3 Model Structure Uncertainty Analysis** 

The uncertainty due to the model structure was analysed by considering different combination of hydrological models with same input data. In this study, the effect of selection of different models for model structure uncertainty was analysed by considering different combination of the models. Further the influence of the input data on the model structure uncertainty was also analysed. A total of eight combinations were assessed by combining different models with the two input datasets. Among the eight ensemble members, the ensemble members from M4 to M7 represent the ensembles of hydrological model combinations with gridded rainfall data as the input and the ensemble members from M8 to M11 represent the ensembles of hydrological model combinations with gauge station rainfall data as the input. For each of the ensemble models, uncertainty bands were constructed to evaluate the model structure uncertainty.  The prediction intervals calculated from the ensemble members and the mean of the ensemble members were used to calculate the uncertainty (Table _5.5_ ). 

**Table 5.5** : Uncertainty evaluation measures of the 95% prediction interval for the ensembles M4 to M11 to analyze model structure uncertainty. 

|||**Calibration**<br>|||**Validation**<br>||
|---|---|---|---|---|---|---|
||**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**B (m**<sup>**3**</sup>**/s)**|
|**M4**|67.73|4025.03|1847.97|72.23|3935.85|1808.49|
|**M5**|70.25|3721.38|1698.07|73.60|3606.25|1733.65|
|**M6**|44.88|3394.06|1951.44|53.92|3324.42|1997.12|
|**M7**|74.29|4395.70|1791.62|76.91|4288.72|1819.11|
|**M8**|55.49|4281.89|2453.09|61.2|4501.3|2574.1|
|**M9**|59.14|4188.21|2433.21|59.3|4809.3|2749.0|
|**M10**|51.46|4000.74|2309.9|55.7|4666.8|2627.9|
|**M11**|64.7|4877.1|2396.3|66.3|5484.2|2728.9|



The uncertainty bounds associated with the model structure was found to be more reliable with increased containing ratio (Table _5.5_ ) compared to the uncertainty bounds associated with input data (Table _5.3_ ). The analysis of model structure predictive uncertainty suggests that ensemble of three hydrological models i.e., M7 and M11 have reliable predictive bounds with higher containing ratio compared to ensemble of two hydrological model combinations. Among these ensembles ‘M7’ and ‘M11’, the ensemble ‘M7’ shows higher containing ratio (74.3%) 

37 

accompanied with lesser ‘B’ (4395.7 m<sup>3</sup> /s) values compared to those of ensemble ‘M11’ (64.7 % and 4877.1 m<sup>3</sup> /s). Among all the ensemble models, the M6 model, which is combination of the HEC-HMS2 and GR4J model, resulted in the least average band width and containing ratio, plausibly due to similar performance of these models for the gridded precipitation data. Among the ensembles of two-member models, the combination of HEC-HMS1 and GR4J has generated more reliable solutions compared to others with both gridded and gauge data as input. The ensembles M5 and M9 have high containing ratios (70.2 % and 59.1%) and better average band width values (3721.4 m<sup>3</sup> /s and 4188.2 m<sup>3</sup> /s) compared to other two-member ensembles. The performance of the ensemble models can be observed from the Figure _5.3_ , where the hydrographs and the prediction band for the three random events is plotted. 

In terms of deterministic evaluation indices (Table _5.6_ ), the ensemble ‘M7’ has shown better performance with lesser percentage error in peak flows (12.72%) and root mean square error (2216.34 m<sup>3</sup> /s) values compared to the ensemble ‘M11’ (19.65% and 3022.67 m<sup>3</sup> /s), during both calibration and validation events. In terms of percent bias, although there is no significant difference among all the ensemble members, the ensembles have performed better in calibration than in validation events. Similar to the input uncertainty evaluation, the mean of the prediction band for different ensemble models were observed to have similar performance. 

**Table 5.6:** Deterministic evaluation measures comparing observed flows and mean flows of the ensembles M4 to M11. 

|||**Calibration**|||**Validation**||
|---|---|---|---|---|---|---|
||**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|
|**M4**|15.23|2328.91|44.77|10.37|2392.47|45.59|
|**M5**|14.95|2237.65|35.76|12.25|2370.86|38.72|
|**M6**|11.72|2311.32|55.34|9.07|2591.68|62.32|
|**M7**|12.72|2216.34|45.29|10.36|2390.18|48.88|
|**M8**|17.97|3168.58|69.02|13.96|3304.28|80.46|
|**M9**|26.21|3190.79|67.61|20.53|3526.66|84.95|
|**M10**|17.38|2894.55|61.40|15.24|3274.86|79.13|
|**M11**|19.65|3022.67|66.01|16.24|3280.86|81.51|



38 



<!-- Start of picture text -->
oSs x10* Event1 oOSs x10* Event9 foe)Sy x104 Event 12 @ x10* Event1 @ x10* Event9 @ x104 Event 12<br>o o o<br>G E . | E E E A/a<br>M4 24 24 D4 ry Ms 21 D4 D4 |<br>2 Sa Oe 2 _A & mes Ware So ee y 34 PSs $9 hee<br>- 0 10 20 30 a 0 10 20 a 0 10 20 30 0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)<br>4 4 4 4 4 4<br>G2 x10 2 x10 2 x10 @9 x10 D2 X10 @2 x10<br>° “ ” A ” 9 ) f\<br>MS 24 D4 | D4 A |+ m9 o24 i oD4 ®D4 ny Vj\<br>© © | ® J} @ i] © \ \<br>3) (a) (a) 2) ) a) HN<br>ic Aw el y | 2 ! S 4. ic £ \ »<br>o 0 5 o0 BD 0 eeseeates oO 0 rai) D0<br>0 10 20 30 0 10 20 0 10 20 30 0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)<br>B2 x104 @2 x10 4 @ 2 X104 ‘@2 x104 Bg X10 4 2 x104<br>o o a “4 Lo] a<br>M6 ryE Oo€ oOE | oE oOE ryE AN<br>21© 24© D4oe M10 24@ m4o D4i] Mt \<br>iSrt) ~ SX, £2) c© ~_ £) =° £7) A<br>0 10 20 30 0 10 20 0 10 20 30 0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)<br>@2 x10 4 @2 x10 4 @2 x10 4 \ 2 x104 D2 X104 2 x10 4<br>© ted foe] ” fe} o fh<br>E G E E E 3 AM<br>M7 ® o a a o C7) | IN<br>24 a4 4 A M11 91 1 C m4 I\<br>i . P®, £ £ g £ : ,<br>o 0 O90 oO 0 ran!) ; Oo 9 = 5 Oo Oneeeet<br>0 10 20 30 0 10 20 0 10 20 30 0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)<br>[_]95% Prediction Interval @ Observed Flows —— Ensemble Mean Flow<br><!-- End of picture text -->

## **5.4 Parameter Uncertainty Analysis** 

The parameter uncertainty for each of the model was analysed using the posterior distribution of the effective parameter sets, which were derived by considering the top 1% of the total sampled parameters in terms of NSE as the likelihood function. The plots of the frequency histograms for the 3 models with two different inputs (total 6 cases) is shown in the Figure _5.4_ . From the figure it can be observed that the posterior distribution of parameters of HEC-HMS1 models were converged to a shorter range compared to the initial ranges reflecting the sensitivity of the parameters. Further it is observed that the values of both the parameters, CN and Lag Time, for HEC-HMS 1 are consistent across the two different input rainfall data sets used. Additionally, the smaller standard deviation values (Table _5.7_ ) indicate less variability in the effective parameter values, implying a relatively lower degree of uncertainty in parameter estimation due to different inputs. The narrower distribution of parameter values indicates a higher level of confidence in the estimated parameter values for the lumped model. On the other hand, for the HEC-HMS2 model, parameters are showing higher standard deviation values compared to the HEC-HMS1, for all the three sub-basins, with both the input rainfall data sets, indicating a wider range of potential parameter values and thus a higher level of uncertainty in parameter estimation. The increased variability indicates that the effective parameter values (CN and Lag Time) for the HEC-HMS2 (Q3 and Q4) model exhibit greater fluctuations around the mean value compared to the HECHMS1. The routing parameters, K and x, also show significant variability with different input rainfall data sets and their wider distribution contributed to larger amount of parameter uncertainty in HEC-HMS2 model. Comparison of parameter distribution across the sub-basins of the study area indicates that the posterior distribution of parameters of sub-basin2 are affected by the input rainfall data set as compared to other sub-basins. The parameters of the conceptual model, GR4J, especially X1 and X3, also show significant variability due to input rainfall data set (Q5 and Q6). The results suggest that the effect of the input rainfall data on the parameter uncertainty depends on the model structure and its spatial representation. 

40 



<!-- Start of picture text -->
5 0.6 0.2 > 0.6 0.15<br>5 0.4 5 0.4 0.1<br>2 0.1 =<br>@ 0.2 © 0.2 0.05<br>Ww 1<br>0 0 0 i)<br>0 50 100 2000 8000 0 50 100 2000 8000<br>CN Lag Time CN Lag Time<br>Case-1 Case-2<br>0.2 Sub-basin1 Sub-basin2 Sub-basin3 Sub-basin1 Sub-basin2 Sub-basin3<br>0.15 0.1 02 0.15<br>0.1 44 ot 0.06<br>0.05 0.1 0.04<br>0.05 0.05 0.02<br>0 0 0 0 0 0<br>0 50 = 100 0 50 0 50 100 0 50 100 0 50 100 0 50 100<br>CN CN CN CN CN CN<br>0.15 0.2 0.15 0.1<br>0.1 0.2<br>0.1 0.1<br>0.05 0.1 0.05 04<br>0.05 0.05<br>oO 0 0 > 0 0 0<br>& 2000 8000 2000 8000 2000 8000 8 2000 8000 2000 8000 2000 8000<br>Fa Lag Time Lag Time Lag Time 3 Lag Time Lag Time Lag Time<br>ic 9.08 0.15 0.15 £ 0.15 0.06 0.1<br>0.06<br>0.1 0.1 0.1 0.04<br>0.04 0.05<br>0.02 0.05 0.05 0.05 0.02<br>0 0 0 0 0 0<br>50 100 15( 50 100 150 50 100 150 50 100 150 50 100 150 50 100 150<br>K K K K K K<br>0.06 0.06 0.08 0.06 p 0.1<br>0.04 0.04 9.06 0.04 0.06<br>;<br>0.02 0.04 0.04 0.05<br>0.02 _ 0.02 &02<br>0 0 0 0 0 0<br>0.2 04 0.2 0.4 0.2 04 0.2 0.4 0.2 04 0.2 04<br>x x x x x x<br>Case-3 Case-4<br>0.1 0.1<br>> im 0.06<br>i=2 0.05 cd 0.05 0.04<br>® 0.02 0.02<br>we<br> 0000<br>0500 1000 5 0 5 0 100 200 300 2 4<br>x1 X2 X3 X4<br>Case-5<br>> 0.2 0.1 0.15 0.1<br>7 0.1<br>2 0.1 0.05 0.05<br>o 0.05<br>Le<br> 0000<br>0500 1000 5 0 5 0 100 200 300 2 =<br>X1 X2 X3 X4<br>Case-6<br><!-- End of picture text -->

**Table 5.7:** Statistical measures of effective parameter sets of each of the model parameter of HEC-HMS1, HEC-HMS2 and GR4J models. 

|**Model**<br>**Rainfall**<br>**Type**|**Gridded r**|**ainfall data**<br>**Stdd**|**Gauge sta**<br>**d**|**tion rainfall**<br>**ata**<br>**Stdd**|
|---|---|---|---|---|
|**Parameter**|**Mean**|**anar**<br>**Deviation**|**Mean**|**anar**<br>**Deviation**|
|**HEC-HMS1**<br>**CN**|33.69|8.57|33.28|8.57|
|<br>**Lag-Time**|2834.99|618.72|2981.29|677.92|
|**CN1**|45.75|15.79|45.30|17.08|
|**CN2**|47.93|17.39|48.30|17.74|
|**CN3**|59.98|19.69|60.27|19.34|
|**Lag-TimM1**|5005.56|4067.12|4417.22|3877.39|
|**Lag-TimM2**|4417.41|3751.58|6681.78|3854.27|
|**HEC-HMS2**<br>**Lag-TimM3**|2979.01|2406.84|3053.86|2224.37|
|<br>**K1**|67.09|46.42|58.0|45.01|
|**K2**|45.45|42.15|77.29|45.73|
|**K3**|46.14|41.57|67.32|47.31|
|**x1**|0.24|0.15|0.24|0.14|
|**x2**|0.26|0.14|0.22|0.13|
|**x3**|0.21|0.14|0.18|0.14|
|**X1**|91.97|50.87|334.49|301.79|
|**GR4J**<br>**X2**|-2.67|1.45|-1.18|3.14|
|**X3**|170.93|69.75|145.85|110.53|
|**X4**|1.85|0.44|1.74|0.56|



**Note:** In the above table, the HEC-HMS2 model represents the parameters for the 3 sub-basins as discussed earlier in the section 4.1.1. 

42 

**Table 5.8:** Parameter uncertainty evaluation using 95% confidence intervals for all the 6 simulation cases. 

|||**Calibratio**<br>|**n**<br>||**Validation**<br>||
|---|---|---|---|---|---|---|
||**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|
|**Q1**|18.40|1249.66|1570.92|21.48|1216.25|1502.36|
|**Q2**|23.0|1641.01|1827.06|27.44|1880.38|1728.13|
|**Q3**|31.61|3888.68|2201.54|23.09|3737.18|2322.34|
|**Q4**|35.05|4042.21|2232.98|27.39|3960.96|2427.55|
|**Q5**|57.58|2290.0|1115.93|59.82|2321.12|1237.38|
|**Q6**|58.45|2965.73|1486.72|62.31|3597.72|1542.51|



The reliability performance indices for the six model cases are shown in the Table _5.8_ . The containing ratios of HEC-HMS1 models, Q1 and Q2, (18.4% and 23%) indicate lower reliability in capturing the observed data within the prediction intervals. The narrower average band widths (1249.66 m<sup>3</sup> /s and 1641.01 m<sup>3</sup> /s) suggest a relatively more precise estimation of the prediction intervals among the three models considered, plausibly due to the narrow convergence of the model parameters. The average deviation amplitudes of HEC-HMS1 models (1570.92 m<sup>3</sup> /s and 1827.06 m<sup>3</sup> /s) have moderate deviations from the mean within the prediction intervals. The containing ratios of HEC-HMS2 models, Q3 and Q4, (31.61% and 35.05%) have better reliability compared to the lumped models. This can be plausibly due to improved resolution of hydrological processes and catchment properties. However, the wider average band widths of HEC-HMS2 models (3888.68 m<sup>3</sup> /s and 4042.21 m<sup>3</sup> /s) suggests increased uncertainty due to parameter variations. The average deviation amplitudes for the HEC-HMS2 models (Q3 and Q4) indicate relatively larger deviations from the mean within the prediction intervals compared to the lumped models. The GR4J model simulations resulted in the highest containing ratios (57.58% and 58.45%) compared to the prediction intervals of the other models. Further, the average band width was observed to be narrower than the HEC-HMS 2 models suggesting that the GR4J model predictions were more reliable and precise. The GR4J model simulations showed better accuracy under parameter uncertainty, as compared to other models, as is evident from the lower average 

43 

deviation amplitudes. The reliability performance of all these models during validation have shown similar trend as that of during calibration. 

It is to be noted that the models with input gridded data (Q1, Q3 and Q5) are exhibiting lower containing ratios compared to the models with input gauge station data (Q2, Q4 and Q6). GR4J models demonstrate highest containing ratios, indicating better reliable predictions under parameter uncertainty. Also, the models with gridded rainfall data (Q1, Q3, and Q5) are exhibiting narrower average band widths compared to the models with gauge station data (Q2, Q4, and Q6). This suggests that the gridded rainfall models tend to provide more precise predictions in terms of the range of the prediction intervals under parameter uncertainty. Among the gridded rainfall models, HEC-HMS1 shows the narrowest average band width, indicating higher precision. Among the gauge station models, HEC-HMS2 shows the narrowest average band width. The deterministic model performance indices also show that ensemble mean of GR4J model with input gridded rainfall data (Q5) has better performance with lower PEPF (23.17%), RMSE (1731.27 m<sup>3</sup> /s) and PBIAS (7.01%) (Table _5.9_ ). 

**Table 5.9:** Deterministic performance of simulated flows of all the 6 simulation cases. 

|||**Calibration**<br>|||**Validation**<br>||
|---|---|---|---|---|---|---|
||**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|
|**Q1**|25.04|2182.07|33.69|11.49|2296.02|30.81|
|**Q2**|31.07|2733.08|38.21|15.05|2576.76|42.76|
|**Q3**|30.15|2577.42|47.69|14.95|2799.29|53.61|
|**Q4**|34.72|2821.91|42.03|14.50|2937.45|58.67|
|**Q5**|23.17|1731.27|7.01|13.80|2155.13|7.30|
|**Q6**|39.23|2331.02|12.64|21.03|2211.93|15.50|



## **5.5 Combined Parameter-Input Uncertainty Analysis** 

The combined parameter and input uncertainty was analysed by forming ensembles of outputs of models with input gridded rainfall data and gauge station data, using effective parameter sets. The ensembles M1, M2 and M3 of HEC-HMS1, HEC-HMS2 and GR4J respectively, as mentioned in 

44 

the **Table** **_4_ .** **_4_** , were analysed for combined parameter and input uncertainty. In this case, the simple model averaging ensemble technique was used and the uncertainty within the model structure was neglected. The prediction intervals of the ensembles were evaluated for reliability **Table** **_5_ .** **_10_** . 

**Table 5.10:** Combined parameter and input uncertainty evaluation using 95% prediction intervals of M1, M2 and M3 ensembles. 

|||**Calibration**<br>|||**Validation**<br>||
|---|---|---|---|---|---|---|
||**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|
|**M1**|29.01|**2286.88**|1717.38|34.88|**2526**|1644.79|
|**M2**|39.37|4716.90|2272.64|31.24|4792.43|2471.05|
|**M3**|**72.01**|3550.24|**1330.43**|**78.74**|4184.71|**1469.71**|



The combined parameter and input uncertainty resulted in higher prediction interval width and containing ratio compared to when only parameter uncertainty was considered, indicating the improved reliability of the predictions by considering combined uncertainty. Among these three ensembles, the ensemble of HEC-HMS1 models show lower containing ratio (29.01%), lower average band width (2286.88 m<sup>3</sup> /s) and moderate average deviation amplitude (1717.38 m<sup>3</sup> /s). It indicates that the HEC-HMS lumped model has lower reliability but of more accurate predictions and moderate deviation of mean within the prediction intervals. The lower parameter uncertainty and lesser impact of rainfall variability in HEC-HMS1 model, as discussed in section 5.4, plausibly resulted in lesser variability of model predictions when combined parameter and input uncertainty is considered. On the other hand, semi-distributed HEC-HMS model, HEC-HMS2, has lower reliability due to wider average band width (4716.90 m<sup>3</sup> /s) and has moderate reliability with a containing ratio (39.37%) greater than that of HEC-HMS1. The ensemble also shows higher deviation of mean (2272.64 m<sup>3</sup> /s) within the prediction interval. Among the three models considered, the ensemble of GR4J model has more reliable predictions with highest containing ratio (72.01%) and also least deviation of mean (1330.43 m<sup>3</sup> /s) within the prediction intervals. The predictions have moderate precision having an average band width (3550.24 m<sup>3</sup> /s) ranging between the band width ranges of the two HEC-HMS models. 

45 



<!-- Start of picture text -->
Event 1 Event 9 Event 12<br>4 4 4<br>a2 x10 @2 x10 G2 x10<br>oy o oO<br>E E E ,<br>M1 ®21 ®1 ®4 |i<br>5 J 5 Kn 5 yh<br>° 0 10 20 a 0 10 20 ° 0 10 20<br>Time(days) Time(days) Time(days)<br>4 4 4<br>a2 x10 G2 x10 @2 x10<br>on o oO<br>Ss = =<br>ce) o a<br>: 5 5 > JS<br>0 10 20 0 10 20 0 10 20<br>Time(days) Time(days) Time(days)<br>4 4 4<br>@2 x10 @2 x10 @2 x10<br>on o o<br>E = —E<br>M3 ce]21 oD4 oD4<br>s -\ | $<br>a 0 10 20 ° 0 10 20 e 0 10 20<br>Time(days) Time(days) Time(days)<br>[95% Prediction Interval © Observed Flows ——— Ensemble Mean Flows<br><!-- End of picture text -->

**Table 5.11:** Deterministic performance of the mean simulated flows of the M1, M2 and M3 ensembles. 

|||**Calibration**<br>|||**Validation**<br>||
|---|---|---|---|---|---|---|
||**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|
|**M1**|26.67|2379.33|35.95|11.50|2308.17|36.78|
|**M2**|32.44|2667.91|44.86|13.17|2813.07|56.14|
|**M3**|29.86|1938.31|4.83|16.38|1937.59|11.40|



## **5.6 Combined Parameter-Model Structure Uncertainty Analysis** 

The combined parameter and model structure uncertainty was analysed for both the input data separately by constructing the prediction intervals using the ensembles of outputs of three models (HEC-HMS1, HEC-HMS2 and GR4J) using the effective parameter sets derived from GLUE. The ensembles from M4 to M7 represents different model combinations with input gridded rainfall data and the ensembles from M8 to M11 represents different model combinations with input gauge station data, as mentioned in the Table _4.4_ . The reliability performance measures (CR, B and D) of each of the ensemble case are presented in the Table _5.12_ . 

**Table 5.12:** Combined parameter and model structure uncertainty evaluation using 95% prediction intervals of ensembles from M4 to M11. 

|||**Calibratio**<br>|**n**<br>||**Validation**<br>||
|---|---|---|---|---|---|---|
||**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|**CR (%)**|**B (m**<sup>**3**</sup>**/s)**|**D (m**<sup>**3**</sup>**/s)**|
|**M4**|38.64|4144.57|2102.68|38.80|4012.68|2184.59|
|**M5**|64.60|2956.27|1255.98|68.24|2872.60|1316.89|
|**M6**|70.44|4846.03|1817.47|69.41|4675.97|1948.22|
|**M7**|71.39|4874.13|1822.73|72.22|4705.72|1933.34|
|**M8**|44.91|4444.62|2139.16|47.44|4526.40|2221.62|
|**M9**|67.42|3682.68|1596.72|70.97|4245.80|1696.67|
|**M10**|69.34|5174.52|1979.02|65.67|5534.92|2212.94|
|**M11**|72.90|5270.33|1983.06|72.71|5651.13|2206.24|



47 

The combined parameter and model structure uncertainty in the model predictions has improved the reliability of the predictions which can be observed from the higher containing ratios (Table _5.12_ ), compared to when only parameter uncertainty and combination of parameter and input uncertainties were considered. The model predictions also resulted in the reduced accuracy that can be concluded from the wider average band widths, indicating the contribution of model structure uncertainty in the total uncertainty. Among these different member model combinations, the ensemble of three-member model combinations i.e., M7 and M11 are showing higher reliability by capturing a greater number of observed streamflow values (71.39% and 72.90%) within the 95% prediction intervals with both input rainfall datasets. This indicates the necessity of using multiple models to simulate the actual streamflow values. The ensemble simulations, M7 and M11, also show greater variability in their predictions, observed from their wider average band widths (4874.13 m<sup>3</sup> /s and 5270.33 m<sup>3</sup> /s). The comparison of performance of two-member model combinations suggested that the combination of HEC-HMS2 and GR4J (M6 and M10) models has more reliable predictions with higher containing ratios and the combination of HEC-HMS1 and GR4J (M5 and M9) models has more precise prediction with lower average band widths and lower deviation of ensemble means within the prediction intervals, with both types of input rainfall datasets. 

The performance of the ensemble simulations, of combined model parameter and structure uncertainty, was compared between the two input datasets. From Table _5.12_ , it can be observed that the variability in the performance between different ensemble members is similar for different inputs. Further, the models using gridded precipitation data resulted in more precise simulations, while the models using gauge data were found to be more reliable comparatively. These results on the performance of the eight ensembles considered (M4 to M11) can be qualitatively observed from the prediction interval plots (Figure _5.6_ ) for the three events considered earlier. It suggests that although the ensembles with different input rainfall data are showing similar capability to capture peak flow, the ensembles with input gauge station rainfall data are capable of capturing medium and low flows within 95% prediction intervals better than those of ensembles with input gridded rainfall data. This can be observed by comparing the prediction interval plots of event-12 under both rainfall datasets. 

48 



<!-- Start of picture text -->
Event 1 Event 9 Event 12 Event 1 Event 9 Event 12<br>4 4 4 4 4 4<br>@2 x10 G2 x10 @2 x10 @2 x10 @2 x10 @2 x10<br>toe) o oO oO oO oO<br>SSo £o —£o —E@ —£o £o<br>M4 21 241 | M8 21 214 24<br>£cy] £o =c =o =os] =o<br>2<br>Yaw LYS 2 D , |Sow iw a LSS a aad! A<br>0 10 20 0 10 20 0 10 20 0 10 20 0 10 20 0 10 20<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)}<br>4 4 4 4 4 4<br>w 2 x10 w2 x10 B2 x10 @2 x10 @2 x10 B2 x10<br>”E oE o=e oO= oa o—<br>M5 ra214 D 4 A° o4 M9 ®£14 a24 o> 4<br>AA. | N\ | 2 F P\ | 2 £<br>Qa Qa Qa a a a<br>0 10 20 0 10 20 0 10 20 0 10 20 0 10 20 0 10 20<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days}<br>4 4 4 4 4 4<br>@2 x10 @2 x10 @2 x10 @2 x10 @2 x10 B2 x10<br>"3. o” oO ~“ ~“ ie)<br>££££=£<br>®<br>M6 £21 £®D4 ao4 M10 =fa21 2o4 =om4 /\<br>0 10 20 0 10 20 0 10 20 0 10 20 0 10 20 0 10 20<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)<br>4 4 4 4 4 4<br>@ 2 X10 @2 x10 @2 x10 wo x10 OP x10 Bo x10<br>be } for] - ~ ~ ie)<br>£ £ £ = = =<br>M7 B 1 ed 1 Fe & 1 & 1 o> 1<br>ra ra a a 6 9 o 0<br>0 10 20 0 10 20 0 10 20 0 10 20 0 10 20 0 10 20<br>Time(days) Time(days) Time(days) Time(days) Time(days) Time(days)<br>[795% Prediction Interval @ Observed Flows ——— Ensemble Mean Flows<br><!-- End of picture text -->

The deterministic model performance indicate that the ensemble means of HEC-HMS1 and GR4J (M5 and M9) models are accurate with lower PEPF (23.43% and 32.13%), RMSE (1815.21 m<sup>3</sup> /s and 2365.03 m<sup>3</sup> /s) and PBIAS (20.35% and 20.42%) (Table _5.13_ ) compared to other ensemble means. 

**Table 5.13:** Deterministic performance evaluation by comparing observed flows and simple ensemble mean of ensembles from M4 to M11. 

|||**Calibration**|||**Validation**||
|---|---|---|---|---|---|---|
||**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|
|**M4**|24.85|2263.49|40.69|12.85|2466.69|42.21|
|**M5**|23.43|1815.21|20.35|11.81|2120.82|19.05|
|**M6**|24.04|1964.96|27.35|13.57|2316.81|30.45|
|**M7**|23.33|1964.01|29.46|12.63|2261.95|30.57|
|**M8**|29.07|2568.70|40.12|32.13|2365.03|20.42|
|**M9**|32.13|2365.03|20.42|18.04|2217.73|29.13|
|**M10**|35.63|2365.05|22.33|15.25|2342.19|37.09|
|**M11**|31.52|2363.46|27.62|14.99|2303.26|38.98|



## **5.7 Combined Parameter-Input-Model Structure Uncertainty Analysis** 

The ensemble M12, which is the combination of all models, inputs and parameters, was used to analyse the combined uncertainty from all the sources. The outputs from the different modelled cases (Q1 to Q6) from all the effective parameter sets were combined using simple ensemble method (represented as M12) and also with BMA technique (represented as BMA). Table _5.14_ indicates the uncertainty evaluation measures for the ensemble members M12 and BMA. 

50 



<!-- Start of picture text -->
Event 1 Event 9 Event 12<br>sec x104 eet4 e2p4<br>Mi2 a rt) o I<br>o o co .<br><=o <=o <=o 4<br>21 4 > 4 ih<br>Qa 0 eres at 7 a 0 a o ccasney ° $<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>x10* x 104 2 x104<br>~AeI oO#E ‘§oa ;<br>BMA o oO |<br>oO co <= .<br>=o <=oO oOav<br>214 4 R 21 |<br>2 , 2 ‘ ra i<br>0 10 20 30 0 10 20 0 10 20 30<br>Time(days) Time(days) Time(days)<br>[195% Prediction Interval @ Observed Flows ——— Ensemble Mean Flows<br><!-- End of picture text -->

(Figure _5.7_ ), where there is a significant decrease in band width along with higher percentage of observed flows within 95% prediction interval, in case of BMA ensemble. The improved performance of the ensemble derived using the BMA is consistent with the earlier studies of Dong et al., (2013), Duan et al., (2007), Jiang et al., (2018) and Meira Neto et al., (2018). The BMA ensemble mean also improved the accuracy in terms of RMSE (1904.79 m<sup>3</sup> /s and 1924.95 m<sup>3</sup> /s) and PBIAS (12.53 % and 18.15 %) compared to the ensemble mean of M12, in both calibration and validation, shown in the Table _5.15_ . 

**Table 5.15:** Deterministic performance evaluation by comparing observed flows and simple ensemble mean of ensemble M12 and BMA ensemble. 

|||**Calibration**<br>|||**Validation**<br>||
|---|---|---|---|---|---|---|
||**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|**PEPF**<br>**(%)**|**RMSE**<br>**(m**<sup>**3**</sup>**/s)**|**PBIAS**<br>**(%)**|
|**M12**|27.19|2113.17|28.54|12.37|2172.48|34.77|
|**BMA**|29.04|1904.79|12.53|14.07|1924.95|18.15|



52 

# **CHAPTER 06** 

# 6. **SUMMARY AND CONCLUSIONS** 

## **6.1 Summary and Conclusions** 

A cumulative assessment of multiple sources of uncertainty in hydrological modelling for flood predictions was performed by considering three different models and two different input sources. The uncertainty analysis was performed in the order of input uncertainty, model structure uncertainty, parameter uncertainty, combined parameter-input uncertainty, combined parametermodel structure uncertainty and the combined parameter-input-model structure uncertainty. The study also analyzed the interactions and effects between different sources of uncertainty on the prediction intervals. The study used multi-model ensembles of three hydrological models (HECHMS1, HEC-HMS2 and GR4J) with different structures to analyse model structure uncertainty between models, with the IMD gridded rainfall data and the IMD gauge station rainfall data to analyse input uncertainty. 

The ensemble models formulated from M1 to M3 were initially analysed to evaluate the influence of only input uncertainty in the modelling of flood events. Among these ensembles, the ensemble of HEC-HMS2 models with two rainfall datasets i.e., M2 has performed better in simulating the observed flood hydrograph, in both calibration and validation events. The ensembles of HECHMS1 i.e., M1 has shown more sensitivity to the input rainfall data source and thus resulted in higher input uncertainty compared to M2 and M3. It also shown that the other sources of 

53 

uncertainty like parameter and model structure uncertainty are also inherently embedded in the modelling process. 

The ensembles formulated from M4 to M11 were analysed to evaluate the influence of model structure uncertainty in the modelling of flood events. The ensembles of three hydrological models of HEC-HMS1, HEC-HMS2 and GR4J i.e., M7 and M11 have shown significant model structure uncertainty in both calibration and validation events, compared to the ensembles of only two model combinations. Further, for the two-member model ensembles, the lumped models of HEC-HMS1 and GR4J using both gridded and gauge rainfall data as input i.e., ‘M5’ and ‘M9’ have more contribution towards the model structure uncertainty. The obtained uncertainty and deterministic evaluation measures suggests that the reliability and precision of gridded rainfall data-based ensembles (M4 to M7) was much better than those of gauge station data-based ensembles (M8 to M11) in both calibration and validation events. 

The parameter uncertainty was analyzed for each model parameters under each input rainfall dataset (Q1 to Q6). The parameter uncertainty of GR4J model has shown less impact on model performance as compared to HEC-HMS1 and HEC-HMS2. The parameter uncertainty of HECHMS2 has shown higher impact on model performance resulting in its reduced accuracy under parameter uncertainty. However, the model predictions are observed to be more reliable than those of HEC-HMS1, due to the spatial variability accounted during the modelling. On the other hand, HEC-HMS1 has shown higher precision indicating the lesser variability of model predictions due to parameter uncertainty but are prone to be least reliable among the three models plausibly due to its simplified modelling conditions. From this analysis, it can be noted that a conceptual hydrological model is less effected by parameter uncertainty and a physically based semidistributed model is more influenced by parameter uncertainty. Also, for a same hydrological model (HEC-HMS), parameter uncertainty has shown significant variation under different spatial resolutions of the model with different input data sets, indicating the influence of input data variability on the parameter uncertainty. 

The effective parameter-sets that were used for parameter uncertainty analysis, are further utilized to form the ensembles accounting for combined parameter and input uncertainty analysis (M1, M2 and M3). Among the three models considered, the GR4J model has shown higher reliability and moderate precision when both parameter and input uncertainty is considered. Among the HEC- 

54 

HMS models, the semi-distributed model, HEC-HMS2, has shown higher reliability but lower precision while the lumped model, HEC-HMS1, has shown lower reliability but higher precision. The distributed model structure of HEC-HMS in describing the hydrological processes has improved the reliability but this complex structure involving more number of parameters induced additional uncertainty in semi-distributed model resulting in lower precision of the model predictions. 

The combined parameter and model structure uncertainty has been analyzed using the ensembles from M4 to M11 with simple ensemble technique. Among all the ensemble cases, ensemble of outputs of three models were found to be more reliable but less precise. Comparison between the two-member ensembles indicates that ensemble of physically-based semi-distributed HEC-HMS model and conceptual GR4J model (M6 and M10) has higher reliability. This can be due to combination of different structured models to describe hydrological processes (physically based and conceptual) under different resolutions considered (semi-distributed and lumped). Comparison of ensembles with different input rainfall data suggested that the ensembles with gridded input rainfall data are found to be more precise and lesser deviation from ensemble mean, and the ensembles with gauge station rainfall data were observed to be more reliable, when combined parameter and model structure uncertainty was considered. The combined parameter, input and model structure uncertainty was analyzed using the ensemble M12 with simple ensemble technique and further with BMA method. The simple ensemble method has resulted in more reliable predictions but with reduced precision compared to all other ensembles (M1 to M11). The BMA ensemble technique, which allocates weights based on individual model performance, has enhanced the reliability and accuracy of the model predictions by capturing greater number of observed streamflow values within the narrower 95% prediction interval width. Overall, this study sheds light on the uncertainties associated with different modelling approaches and input data sources, providing insights into the challenges and opportunities for improving the reliability of hydrological predictions. 

## **6.2 Limitations of the Study** 

The findings of the study are limited to the study area considered and may vary for other watersheds. Compromising with limited data, available hydrological models and statistical methods used in the study may restrict to exactly quantify the uncertainty and in analysing the 

55 

reliability of model predictions. The methodology to analyze multiple sources of uncertainty, has accounted only input, model structure and parameter uncertainty, which, in practical may also include uncertainties due to initial and boundary conditions, calibration techniques, spatial and temporal changes in catchment properties etc. The key findings of the study may vary with different input data sources, sophisticated hydrological models, improved computational efficiency and statistics. 

## **6.3 Scope for the Future Study** 

Based on the findings and limitations of the present study, there are many promising directions for future research aiming at improving our understanding of uncertainties in hydrological system. 

- Uncertainty reduction strategies can be adopted by enhanced data collection and advanced modelling approaches. 

- Detailed analysis on spatial and temporal behaviour of catchment properties can further enhance our understanding of propagation of various sources of uncertainties. 

- Future research can incorporate climate change projections to get detailed insights into potential sources of hydrological uncertainties and improve the resilience of water resource management strategies in the face of a changing climate. 

56 

# **REFERENCES** 

Aitken, G., Beevers, L., & Christie, M. A. (2022). Multi-Level Monte Carlo Models for Flood Inundation Uncertainty Quantification. _Water Resources Research_ , _58_ (11). https://doi.org/10.1029/2022WR032599 

Ajami, N. K., Duan, Q., & Sorooshian, S. (2007). An integrated hydrologic Bayesian multi-model combination framework: Confronting input, parameter, and model structural uncertainty in hydrologic prediction. _Water Resources Research_ , _43_ (1). https://doi.org/10.1029/2005WR004745 

- Aragaw, H. M., Goel, M. K., & Mishra, S. K. (2021). Hydrological responses to human-induced land use/land cover changes in the Gidabo River basin, Ethiopia. _Hydrological Sciences Journal_ , _66_ (4), 640–655. https://doi.org/10.1080/02626667.2021.1890328 

- Ballinas-González, H. A., Alcocer-Yamanaka, V. H., & Pedrozo-Acuña, A. (2016). Uncertainty analysis in data-scarce urban catchments. _Water_ , _8_ (11). https://doi.org/10.3390/w8110524 

- Barbetta, S., Coccia, G., Moramarco, T., & Todini, E. (2016). Case study: A real-time flood forecasting system with predictive uncertainty estimation for the Godavari River, India. _Water_ , _8_ (10). https://doi.org/10.3390/w8100463 

- Becker, A., & Serban, P. (1990). _Hydrological model for water-resources system design and operation_ . World Meteorological Organization. https://nla.gov.au/nla.cat-vn1860463 

- Beven, K., & Binley, A. (1992). The future of distributed models: model calibration and uncertainty prediction. _Hydrological Processes_ , _6_ , 279–298. https://doi.org/10.1002/hyp.3360060305 

- Beven, K., & Freer, J. (2001). Equifinality, data assimilation, and uncertainty estimation in mechanistic modelling of complex environmental systems using the GLUE methodology. _Journal of Hydrology_ , 11–29. https://doi.org/10.1016/S0022-1694(01)00421-8 

- Bian, G., Wang, G., Chen, J., Zhang, J., & Song, M. (2021). Spatial and seasonal variations of hydrological responses to climate and land-use changes in a highly urbanized basin of Southeastern China. _Hydrology Research_ , _52_ (2), 506–522. https://doi.org/10.2166/nh.2021.087 

57 

Blasone, R. S., Vrugt, J. A., Madsen, H., Rosbjerg, D., Robinson, B. A., & Zyvoloski, G. A. (2008). Generalized likelihood uncertainty estimation (GLUE) using adaptive Markov Chain Monte Carlo sampling. _Advances in Water Resources_ , _31_ (4), 630–648. https://doi.org/10.1016/j.advwatres.2007.12.003 

Boelee, L., Hrpp, al, Lumbroso, D., Samuels, P., Stephens, E., & Cloke, H. (2017). A review of the understanding of uncertainty in a flood forecasting system and the available methods of dealing with it. _IAHR World Congress_ . http://eprints.hrwallingford.com/id/eprint/1212 

Butts, M. B., Payne, J. T., Kristensen, M., & Madsen, H. (2004). An evaluation of the impact of model structure on hydrological modelling uncertainty for streamflow simulation. _Journal of Hydrology_ , _298_ (1–4), 242–266. https://doi.org/10.1016/j.jhydrol.2004.03.042 

- Chow, V. Te, Maidment, D. R., & Mays, L. W. (1988). _Applied hydrology_ . McGraw-Hill. 

- Cloke, H. L., & Pappenberger, F. (2009). Ensemble flood forecasting: A review. _Journal of Hydrology_ , _375_ (3–4), 613–626. https://doi.org/10.1016/j.jhydrol.2009.06.005 

- CWC, & NRSC. (2014). _Godavari basin report - Version 2.0_ . www.india-wris.nrsc.gov.in 

- Davis, S., Pentakota, L., Saptarishy, N., & Mujumdar, Pradeep. P. (2022). A Flood Forecasting Framework Coupling a High Resolution WRF Ensemble with an Urban Hydrologic Model. _Frontiers in Earth Science_ , _10_ . https://doi.org/10.3389/feart.2022.883842 

- de Salis, H. H. C., da Costa, A. M., Vianna, J. H. M., Schuler, M. A., Künne, A., Fernandes, L. F. S., & Pacheco, F. A. L. (2019). Hydrologic modeling for sustainable water resources management in urbanized karst areas. _International Journal of Environmental Research and Public Health_ , _16_ (14). https://doi.org/10.3390/ijerph16142542 

- Di Baldassarre, G., & Montanari, A. (2009). Uncertainty in river discharge observations: a quantitative analysis. _Hydrology and Earth System Sciences_ , _13_ , 913–921. https://doi.org/https://doi.org/10.5194/hess-13-913-2009 

Dong, L., Xiong, L., & Yu, K. X. (2013). Uncertainty analysis of multiple hydrologic models using the Bayesian model averaging method. _Journal of Applied Mathematics_ , _2013_ , 1–11. https://doi.org/10.1155/2013/346045 

58 

- Duan, Q., Ajami, N. K., Gao, X., & Sorooshian, S. (2007). Multi-model ensemble hydrologic prediction using Bayesian model averaging. _Advances in Water Resources_ , _30_ (5), 1371– 1386. https://doi.org/10.1016/j.advwatres.2006.11.014 

- Dwarakish, G. S., & Ganasri, B. P. (2015). Impact of land use change on hydrological systems: A review of current modeling approaches. _Cogent Geoscience_ , _1_ (1), 1115691. https://doi.org/10.1080/23312041.2015.1115691 

- Engeland, K., Steinsland, I., Johansen, S. S., Petersen-Øverleir, A., & Kolberg, S. (2016). Effects of uncertainties in hydrological modelling. A case study of a mountainous catchment in Southern Norway. _Journal of Hydrology_ , _536_ , 147–160. https://doi.org/10.1016/j.jhydrol.2016.02.036 

- Georgakakos, K. P., Seo, D. J., Gupta, H., Schaake, J., & Butts, M. B. (2004). Towards the characterization of streamflow simulation uncertainty through multimodel ensembles. _Journal of Hydrology_ , _298_ (1–4), 222–241. https://doi.org/10.1016/j.jhydrol.2004.03.037 

- Ghaith, M., Siam, A., Li, Z., & El-Dakhakhni, W. (2020). Hybrid Hydrological Data-Driven Approach for Daily Streamflow Forecasting. _Journal of Hydrologic Engineering_ , _25_ (2). https://doi.org/10.1061/(asce)he.1943-5584.0001866 

- Gong, W., Gupta, H. v., Yang, D., Sricharan, K., & Hero, A. O. (2013). Estimating epistemic and aleatory uncertainties during hydrologic modeling: An information theoretic approach. _Water Resources Research_ , _49_ (4), 2253–2273. https://doi.org/10.1002/wrcr.20161 

- Haberlandt, U. (2010). From hydrological modelling to decision support. _Advances in Geosciences_ , _27_ , 11–19. https://doi.org/10.5194/adgeo-27-11-2010 

- Herrera, P. A., Marazuela, M. A., & Hofmann, T. (2022). Parameter estimation and uncertainty analysis in hydrological modeling. _Wiley Interdisciplinary Reviews: Water_ , _9_ (1). https://doi.org/10.1002/wat2.1569 

- Horton, P., Schaefli, B., & Kauzlaric, M. (2022). Why do we have so many different hydrological models? A review based on the case of Switzerland. _Wiley Interdisciplinary Reviews: Water_ , _9_ (1). https://doi.org/10.1002/wat2.1574 

59 

- Jain, S. K., Mani, P., Jain, S. K., Prakash, P., Singh, V. P., Tullos, D., Kumar, S., Agarwal, S. P., & Dimri, A. P. (2018). A Brief review of flood forecasting techniques and their applications. _International Journal of River Basin Management_ , _16_ (3), 329–344. https://doi.org/10.1080/15715124.2017.1411920 

- Jiang, S., Ren, L., Xu, C. Y., Liu, S., Yuan, F., & Yang, X. (2018). Quantifying multi-source uncertainties in multi-model predictions using the Bayesian model averaging scheme. _Hydrology Research_ , _49_ (3), 954–970. https://doi.org/10.2166/nh.2017.272 

- Jung, J. Y., Niemann, J. D., & Greimann, B. P. (2018). Modeling input errors to improve uncertainty estimates for one-dimensional sediment transport models. _Stochastic Environmental Research and Risk Assessment_ , _32_ (6), 1817–1832. https://doi.org/10.1007/s00477-017-1495-8 

- Kurian, C., Sudheer, K. P., Vema, V. K., & Sahoo, D. (2020). Effective flood forecasting at higher lead times through hybrid modelling framework. _Journal of Hydrology_ , _587_ . https://doi.org/10.1016/j.jhydrol.2020.124945 

- Lehbab-Boukezzi, Z., Boukezzi, L., & Errih, M. (2016). Uncertainty analysis of HEC-HMS model using the GLUE method for flash flood forecasting of Mekerra watershed, Algeria. _Arabian Journal of Geosciences_ , _9_ (20). https://doi.org/10.1007/s12517-016-2771-5 

- Li, B., He, Y., & Ren, L. (2018). Multisource hydrologic modeling uncertainty analysis using the IBUNE framework in a humid catchment. _Stochastic Environmental Research and Risk Assessment_ , _32_ (1), 37–50. https://doi.org/10.1007/s00477-017-1424-x 

- Loucks, D. P., Beek, E. van., Stedinger, J. R., Dijkman, J. P. M., & Villars, M. T. (2005). _Water resources systems planning and management: an introduction to methods, models and applications_ . UNESCO. 

- Manjare, B. S. (2017). Prioritization of WRDH0-40 Watershed, Wardha River Basin, Yeotmal District, Maharashtra for Sustainable Development and Management of Natural Resources. _Journal of Geosciences Research_ , _2_ (2), 187–192. www.ggsnagpur.org 

60 

- Maulidiani, Rudiyanto, Abas, F., Ismail, I. S., & Lajis, N. H. (2018). Generalized Likelihood Uncertainty Estimation (GLUE) methodology for optimization of extraction in natural products. _Food Chemistry_ , _250_ , 37–45. https://doi.org/10.1016/j.foodchem.2018.01.023 

- McMillan, H., Jackson, B., Clark, M., Kavetski, D., & Woods, R. (2011). Rainfall uncertainty in hydrological modelling: An evaluation of multiplicative error models. _Journal of Hydrology_ , _400_ (1–2), 83–94. https://doi.org/10.1016/j.jhydrol.2011.01.026 

- Mcmillan, H., Krueger, T., & Freer, J. (2012). Benchmarking observational uncertainties for hydrology: Rainfall, river discharge and water quality. _Hydrological Processes_ , _26_ (26), 4078–4111. https://doi.org/10.1002/hyp.9384 

- Meira Neto, A. A., Oliveira, P. T. S., Rodrigues, D. B. B., & Wendland, E. (2018). Improving Streamflow Prediction Using Uncertainty Analysis and Bayesian Model Averaging. _Journal of Hydrologic Engineering_ , _23_ (5). https://doi.org/10.1061/(asce)he.1943-5584.0001639 

- Mirzaei, M., Huang, Y. F., El-Shafie, A., & Shatirah, A. (2015). Application of the generalized likelihood uncertainty estimation (GLUE) approach for assessing uncertainty in hydrological models: a review. _Stochastic Environmental Research and Risk Assessment_ , _29_ (5), 1265– 1273. https://doi.org/10.1007/s00477-014-1000-6 

- Moges, E., Demissie, Y., Larsen, L., & Yassin, F. (2021). Review: Sources of hydrological model uncertainties and advances in their analysis. _Water_ , _13_ (1). https://doi.org/10.3390/w13010028 

- Mohanty, M. P., Mudgil, S., & Karmakar, S. (2020). Flood management in India: A focussed review on the current status and future challenges. _International Journal of Disaster Risk Reduction_ , _49_ . https://doi.org/10.1016/j.ijdrr.2020.101660 

- Moknatian, M., & Mukundan, R. (2023). Uncertainty analysis of streamflow simulations using multiple objective functions and Bayesian Model Averaging. _Journal of Hydrology_ , _617_ . https://doi.org/10.1016/j.jhydrol.2022.128961 

- Mujumdar, P. P., Mohan Kumar, M. S., Sreenivasa Reddy, G. S., Avinash, S., Chawla, I., Kaushika, G. S., Sharma, A., Davis, S., Thomas, T., Thomas, C. A., Jahagirdar, V. S., Arpitha, H. M., Parashuram, K., & Kumar, A. (2021). Development of an urban flood model for 

61 

Bengaluru city, Karnataka, India. _Current Science_ , _120_ (9), 1441–1448. https://doi.org/10.18520/cs/v120/i9/1441-1448 

- Pai, D. S., Sridhar, L., Rajeevan, M., Sreejith, O. P., Satbhai, N. S., & Mukhopadyay, B. (2014). Development of a new high spatial resolution (0.25° × 0.25°) Long Period (1901-2010) daily gridded rainfall data set over India and its comparison with existing data sets over the region. _Mausam_ , _65_ (1), 1–18. https://doi.org/https://doi.org/10.54302/mausam.v65i1.851 

- Pande, C., Moharir, K., & Pande, R. (2021). Assessment of morphometric and hypsometric study for watershed development using spatial technology–a case study of Wardha river basin in Maharashtra, India. _International Journal of River Basin Management_ , _19_ (1), 43–53. https://doi.org/10.1080/15715124.2018.1505737 

- Pang, B., Yue, J., Huang, Z., & Zhang, R. (2019). Parameter uncertainty assessment of a flood forecasting model using multiple objectives. _Journal of Flood Risk Management_ , _12_ (S1). https://doi.org/10.1111/jfr3.12493 

- Parvaze, S., Khan, J. N., Kumar, R., & Allaie, S. P. (2022). Flood forecasting in Jhelum river basin using integrated hydrological and hydraulic modeling approach with a real-time updating procedure. _Climate Dynamics_ , _59_ (7–8), 2231–2255. https://doi.org/10.1007/s00382-02206206-3 

- Perrin, C., Michel, C., & Andréassian, V. (2003). Improvement of a parsimonious model for streamflow simulation. _Journal of Hydrology_ , _279_ (1–4), 275–289. https://doi.org/10.1016/S0022-1694(03)00225-7 

- Piadeh, F., Behzadian, K., & Alani, A. M. (2022). A critical review of real-time modelling of flood forecasting in urban drainage systems. _Journal of Hydrology_ , _607_ . https://doi.org/10.1016/j.jhydrol.2022.127476 

- Rafiei Emam, A., Kappas, M., Fassnacht, S., & Linh, N. H. K. (2018). Uncertainty analysis of hydrological modeling in a tropical area using different algorithms. _Frontiers of Earth Science_ , _12_ (4), 661–671. https://doi.org/10.1007/s11707-018-0695-y 

- Ragab, R., Kaelin, A., Afzal, M., & Panagea, I. (2020). Application of Generalized Likelihood Uncertainty Estimation (GLUE) at different temporal scales to reduce the uncertainty level 

62 

in modelled river flows. _Hydrological Sciences Journal_ , _65_ (11), 1856–1871. https://doi.org/10.1080/02626667.2020.1764961 

- Ray, K., Pandey, P., Pandey, C., Dimri, A. P., & Kishore, K. (2019). On the recent floods in India. _Current Science_ , _117_ (2). https://doi.org/http://dx.doi.org/10.18520/cs/v117/i2/204-218 

- Roy, B., Islam, A. K. M. S., Islam, G. M. T., Khan, Md. J. U., Bhattacharya, B., Ali, Md. H., Khan, A. S., Hossain, Md. S., Sarker, G. C., & Pieu, N. M. (2019). Frequency Analysis of Flash Floods for Establishing New Danger Levels for the Rivers in the Northeast Haor Region of Bangladesh. _Journal of Hydrologic Engineering_ , _24_ (4), 05019004. https://doi.org/10.1061/(asce)he.1943-5584.0001760 

- Shu, Z., Zhang, J., Wang, L., Jin, J., Cui, N., Wang, G., Sun, Z., Liu, Y., Bao, Z., & Liu, C. (2022). Evaluation of the impact of multi-source uncertainties on meteorological and hydrological ensemble forecasting. _Engineering_ . https://doi.org/10.1016/j.eng.2022.06.007 

- Stedinger, J. R., Vogel, R. M., Lee, S. U., & Batchelder, R. (2008). Appraisal of the generalized likelihood uncertainty estimation (GLUE) method. _Water Resources Research_ , _44_ (12). https://doi.org/10.1029/2008wr006822 

- Strauch, M., Bernhofer, C., Koide, S., Volk, M., Lorz, C., & Makeschin, F. (2012). Using precipitation data ensemble for uncertainty analysis in SWAT streamflow simulation. _Journal of Hydrology_ , _414–415_ , 413–424. https://doi.org/10.1016/j.jhydrol.2011.11.014 

- Sun, R., Yuan, H., & Yang, Y. (2018). Using multiple satellite-gauge merged precipitation products ensemble for hydrologic uncertainty analysis over the Huaihe River basin. _Journal of Hydrology_ , _566_ , 406–420. https://doi.org/10.1016/j.jhydrol.2018.09.024 

- Takele, G. S., Gebre, G. S., Gebremariam, A. G., & Engida, A. N. (2022). Hydrological modeling in the Upper Blue Nile basin using soil and water analysis tool (SWAT). _Modeling Earth Systems and Environment_ , _8_ (1), 277–292. https://doi.org/10.1007/s40808-021-01085-9 

- Tamiru, H., & Dinka, M. O. (2021). Application of ANN and HEC-RAS model for flood inundation mapping in lower Baro Akobo River Basin, Ethiopia. _Journal of Hydrology: Regional Studies_ , _36_ . https://doi.org/10.1016/j.ejrh.2021.100855 

63 

Tariku, T. B., Thian, ;, Gan, Y., Asce, F., Li, ; Jianfeng, & Qin, X. (2020). Impact of Climate Change on Hydrology and Hydrologic Extremes of Upper Blue Nile River Basin. _Journal of Water Resources Planning and Management_ , _147_ (2). https://doi.org/10.1061/(ASCE)WR.1943-5452.0001321 

Todini, E. (2004). Role and treatment of uncertainty in real-time flood forecasting. _Hydrological Processes_ , _18_ (14), 2743–2746. https://doi.org/10.1002/hyp.5687 

Troin, M., Martel, J. L., Arsenault, R., & Brissette, F. (2022). Large-sample study of uncertainty of hydrological model components over North America. _Journal of Hydrology_ , _609_ . https://doi.org/10.1016/j.jhydrol.2022.127766 

USACE. (2000). _Hydrologic Modeling System (HEC-HMS) Technical Reference Manual_ . 

Vema, V. K., Sudheer, K. P., & Chaubey, I. (2020). Uncertainty of hydrologic simulation, and its impact on the design and the effectiveness of water conservation structures. _Stochastic Environmental Research and Risk Assessment_ , _34_ (7), 973–991. https://doi.org/10.1007/s00477-020-01814-z 

Vrugt, J. A., Gupta, H. V., Bouten, W., & Sorooshian, S. (2003). A Shuffled Complex Evolution Metropolis algorithm for optimization and uncertainty assessment of hydrologic model parameters. _Water Resources Research_ , _39_ (8). https://doi.org/10.1029/2002WR001642 

Vrugt, J. A., & Robinson, B. A. (2007). Improved evolutionary optimization from genetically adaptive multimethod search. In _PNAS_ (Vol. 104). https://doi.org/https://doi.org/10.1073/pnas.0610471104 

Vrugt, J. A., ter Braak, C. J. F., Clark, M. P., Hyman, J. M., & Robinson, B. A. (2008). Treatment of input uncertainty in hydrologic modeling: Doing hydrology backward with Markov chain Monte Carlo simulation. _Water Resources Research_ , _44_ (12). https://doi.org/10.1029/2007wr006720 

Wu, H., & Chen, B. (2015). Evaluating uncertainty estimates in distributed hydrological modeling for the Wenjing River watershed in China by GLUE, SUFI-2, and ParaSol methods. _Ecological Engineering_ , _76_ , 110–121. https://doi.org/10.1016/j.ecoleng.2014.05.014 

64 

- Wu, W., Emerton, R., Duan, Q., Wood, A. W., Wetterhall, F., & Robertson, D. E. (2020). Ensemble flood forecasting: Current status and future opportunities. _Wiley Interdisciplinary Reviews: Water_ , _7_ (3). https://doi.org/10.1002/WAT2.1432 

- Yang, J., Reichert, P., Abbaspour, K. C., Xia, J., & Yang, H. (2008). Comparing uncertainty analysis techniques for a SWAT application to the Chaohe Basin in China. _Journal of Hydrology_ , _358_ (1–2), 1–23. https://doi.org/10.1016/j.jhydrol.2008.05.012 

- Yu, Y., Disse, M., Yu, R., Yu, G., Sun, L., Huttner, P., & Rumbaur, C. (2015). Large-scale hydrological modeling and decision-making for agricultural water consumption and allocation in the main stem Tarim River, China. _Water_ , _7_ (6), 2821–2839. https://doi.org/10.3390/w7062821 

65 

# **VISIBLE OUTPUT** 

- Prasanth, B., Vema, V.K. (2023). Evaluating the input and model structure uncertainty in hydrological modelling for flood predictions. _Journal of Hydrology._ ( _Submitted_ ) 

- Prasanth, B., Vema, V.K. (2023). Evaluation of multi-source uncertainties, their interactions and combined effects in hydrological modelling for flood predictions. _Water Resources Research. (Submitted)._ 

66 



<!-- Start of picture text -->
“eS\TUT,<br>o WE AAY<br>% ut sina! vr<br>WARANGAL<br><!-- End of picture text -->



<!-- Start of picture text -->
stITUTeTUT,<br>Ss x X—. ~<br>= Qaae—titiy | S<br>= ‘SSH #8’ fF<br>4 #8 HH Oo<br>re}+ EFfil iA 6FS<br>WARANGAL<br><!-- End of picture text -->

# **DISSERTATION APPROVAL FOR MTech** 

This dissertation entitled **“Application of Soil Moisture in Regionalization Framework for Predictions in Ungauged Basin and its Uncertainty Quantification”** by **Pattabiraman B (201664)** is approved for the degree of **Master of Technology** in **Civil Engineering** with specialization in **Water Resources Engineering** 

### **Examiners** 



<!-- Start of picture text -->
________________________<br>________________________<br>________________________<br><!-- End of picture text -->

### **Supervisor** 

- (Dr. V. Vamsi Krishna) 

### **Chairman** 

________________________ 

Date: ____________ 

Place: Warangal 

ii 

# **DECLARATION** 

I **(Pattabiraman B),** bearing **Roll No - 201664** hereby declare that the dissertation titled **“Application of Soil Moisture in Regionalization Framework for Predictions in Ungauged Basin and its Uncertainty Quantification”** under the supervision of Dr. V. Vamsi Krishna is submitted in partial fulfilment of the requirements for the award of the Degree of Master of Technology in Civil Engineering with specialization in Water Resources Engineering. I declare that this written submission represents my ideas in my own words and where other’s ideas or words have been included, I have adequately cited and referenced the original sources. I also declared that I have adhered to all principles of academic honesty and integrity and have not misrepresented or fabricated or falsified any idea/data/fact/source in my submission. I understand that any violation of the above will be cause for disciplinary action by the institute and can also evoke penal action from the sources which have thus not been properly cited or from whom proper permission has not been taken when needed. 

**Pattabiraman B Roll No: 201664 Date: __________** 

iii 

# **ACKNOWLEDGEMENT** 

One page can never suffice to express the sense of gratitude to those whose guidance and assistance was indispensable for the completion of this project. 

I avail this opportunity to express my profound sense of gratitude and indebtedness to my esteemed supervisor **Dr. V. Vamsi Krishna** , Assistant Professor, Department of Civil Engineering, National Institute of Technology, Warangal for his sustained interest, sincere guidance, constant supervision and encouragement in carrying out this project work. 

I feel greatly indebted and record my profound sense of reverence and gratitude to **Prof. P. Rathish Kumar** , Head of the Civil Engineering Department, NIT, Warangal, for his valuable support by ensuring the facilities to carry out my thesis work. 

I am also grateful to acknowledge **Prof. N V Umamahesh** , Course coordinator, Water Resources Engineering specialization for providing suggestions and comments during my thesis work. 

I express my gratitude to all the faculty members of Water Resources Engineering specialization, **Prof. KV Jayakumar, Prof. P. Anand Raj, Sri V.N. Kameswara Rao, Dr. Manish Pandey and Dr. Litan Kumar Ray** for their wholehearted cooperation, painstaking effort and pragmatic ideas for my thesis to be completed within the stipulated period of time. 

I would also like to thank Mr. Bhabesh Das and Mr. Kusuma Vineeth Reddy, two of my colleagues and Mr. Manikanta Velpuri, Research scholar for their help in this project. 

Above all, I owe my encompassing debt, abysmal love and regard to all my beloved friends without whose silent blessings, continued support, ceaseless applause and eternal inspiration, the completion of this project work would have been possible. 

I thank all my fellow classmates who supported me in every possible way, despite of their busy works. 

**PATTABIRAMAN Roll.no: 201664** 

iv 

# **ABSTRACT** 

Continuous streamflow prediction in ungauged basin and the quantification of its uncertainty has been challenging over the decades. Regionalization of parameters from gauged basin has been the most promising approach adopted by the researchers. However, the improvement of hydrological model prediction in regionalization with proper alternative observed data has been constantly explored. In this study the predictive uncertainty quantification in ungauged basin is proposed using the regression-based regionalization framework between the catchment attributes and probability distribution function (PDF) of hydrological model parameters. The parameter uncertainty is accounted by deriving the probability density function of parameters using DREAM algorithm through MCMC procedure. The multi-linear regression model is developed between PDFs of parameters and catchment attributes for regionalization of the parameters to pseudo ungauged basin. The regionalization approach is validated for all the 12 watersheds considered in this study as pseudo ungauged basins using leave one out cross validation. The uncertainty quantification in regionalization for streamflow prediction analysed by average of the prediction is better performing with NSE of 0.77 in Pseudo ungauged basin (Sugar Creek EdinBurgh watershed). Further, the remote sensing soil moisture from GLDAS was compared with the model simulated soil moisture analysed using NSE to sub sample the regionalization parameter space in ungauged basin. The regionalization of the reduced parameter set to assess the change in uncertainty quantification is performed and found to have same performance NSE of 0.77 in ungauged basin for streamflow prediction with reduction in average width of 0.23 mm/day in ensembles of streamflow prediction. The ensemble of the simulations has similar performance compared to the model calibrated using streamflow (NSE 0.77). The remote sensing soil moisture was used as an alternative input in the ungauged basin for simulation of the hydrological model in estimation of parameter. The simulation of model performed under two scenarios i.e., entire range of the parameter and parameter space from regionalization respectively have performed good in estimation parameters. However, the scenario 2 have good performance with NSE of 0.73 in ungauged basin. The outcome of the study indicates that the calibration of hydrological model using remote sensing soil moisture product as simulating variable have improved performance the model prediction in the parameter range obtained from the regionalization framework in the ungauged basin. Thus, the integration of regionalization approach with simulation of hydrological model using remote sensing products in the ungauged basin is recommended to apply in the real time prediction. 

v 

# **TABLE OF CONTENTS** 

|**CERTIFICATE ......................................................................................................................... i**|
|---|
|**DISSERTATION APPROVAL FOR MTech ........................................................................ ii**|
|**DECLARATION ..................................................................................................................... iii**|
|**ACKNOWLEDGEMENT ...................................................................................................... iv**|
|**ABSTRACT .............................................................................................................................. v**|
|**TABLE OF CONTENTS ........................................................................................................ vi**|
|**LIST OF FIGURES ................................................................................................................. ix**|
|**LIST OF TABLES .................................................................................................................... x**|
|**CHAPTER 01 ............................................................................................................................ 1**|
|**INTRODUCTION ................................................................................................................... 1**|
|1.1 GENERAL ....................................................................................................................... 1|
|1.2 HYDROLOGY OF UNGAUGED BASIN ...................................................................... 2|
|1.3 HYDROLOGICAL MODELS FOR UNGAUGED BASIN ........................................... 3|
|1.4 REGIONALIZATION IN UNGAUGED BASINS ......................................................... 5|
|1.5 REMOTE SENSING PRODUCTS IN UNGAUGED BASIN ........................................ 5|
|1.6 OBJECTIVES OF THE STUDY ..................................................................................... 6|
|1.7 ORGANIZATION OF THESIS ....................................................................................... 7|
|**CHAPTER 02 ............................................................................................................................ 8**|
|**REVIEW OF LITERATURE ................................................................................................ 8**|
|2.1 HYDROLOGY ................................................................................................................. 8|
|2.2 HYDROLOGICAL MODELLING .................................................................................. 8|
|2.3 HYDROLOGICAL MODELS OF UNGAUGED BASINS ............................................ 9|
|2.4 REGIONALIZATION IN UNGAUGED BASIN ............................................................ 9|
|2.5 REMOTE SENSING DATA IN UNGAUGED BASIN ................................................ 12|
|2.6 SUMMARY OF LITERATURE .................................................................................... 13|



vi 

|**CHAPTER 03 .......................................................................................................................... 14**|
|---|
|**STUDY AREA AND DATA COLLECTION ..................................................................... 14**|
|3.1 THE STUDY AREA ...................................................................................................... 14|
|3.1.1 Topography .............................................................................................................. 14|
|3.1.2 Land use/Land cover ............................................................................................... 14|
|3.1.3 Drainage .................................................................................................................. 14|
|3.1.4 Soil ........................................................................................................................... 16|
|3.1.5 Climatic conditions .................................................................................................. 16|
|3.2 DATA COLLECTION ................................................................................................... 16|
|3.2.1 Simulation Data ....................................................................................................... 16|
|3.2.1.1 Rainfall ............................................................................................................. 16|
|3.2.1.2 Temperature ...................................................................................................... 17|
|3.2.1.3 Potential evapotranspiration ............................................................................. 17|
|3.2.1.4 Streamflow ....................................................................................................... 17|
|3.2.1.5 Soil moisture data ............................................................................................. 17|
|3.2.2 Catchment Attributes data ....................................................................................... 17|
|3.2.2.1 Physiographic Data ........................................................................................... 17|
|3.2.2.2 Climatological Data .......................................................................................... 18|
|3.2.2.3 Soil attributes .................................................................................................... 18|
|3.2.2.4 Land use and Morphometric information ......................................................... 18|
|**CHAPTER 04 .......................................................................................................................... 20**|
|**METHODOLOGY ................................................................................................................ 20**|
|4.1 HYDROLOGICAL MODEL ......................................................................................... 20|
|4.1.1 Genie Rural a 4 parameters Journalier (GR4J) model ............................................. 20|
|4.1.2 CemaNeige version of GR4J ................................................................................... 22|
|4.1.3 Calibration ............................................................................................................... 23|
|4.1.4 Model Validation ..................................................................................................... 23|
|4.1.5 Optimizer ................................................................................................................. 23|
|4.1.6 Differential Evolution optimizer ............................................................................. 24|



vii 

|4.2 DERIVATION OF PDF OF THE HYDROLOGICAL MODEL PARAMETERS ....... 24|
|---|
|4.2.1 Differential Evolution Adaptive Metropolis algorithm (DREAM) ......................... 24|
|4.2.2 Markov Chain Monte Carlo Simulation with DREAM........................................... 26|
|4.3 REGRESSION BASED REGIONALIZATION ............................................................ 27|
|4.3.1 MULTIPLE LINEAR REGRESSION .................................................................... 27|
|4.4 LEAVE ONE OUT CROSS VALIDATION ................................................................. 28|
|4.5 SIMULATION WITH REMOTE SENSING DATA .................................................... 28|
|**CHAPTER 05 .......................................................................................................................... 30**|
|**RESULTS AND DISCUSSION ............................................................................................ 30**|
|5.1 CALIBRATION OF GR4J HYDROLOGICAL MODEL ............................................. 30|
|5.2 DERIVATION OF PARAMETERS PDF & BEST FIT DISTRIBUTION ................... 31|
|5.3 REGRESSION BASED REGIONALIZATION FRAMEWORK ................................. 33|
|5.4 ASSESSING THE PREDICTION UNCERTAINTY USING SATELLITE BASED|
|SOIL MOISTURE DATA .................................................................................................... 37|
|5.5 CALIBRATION OF HYDROLOGICAL MODEL USING SOIL MOISTURE IN|
|UNGAUGED BASINS ........................................................................................................ 41|
|**CHAPTER 06 .......................................................................................................................... 49**|
|**SUMMARY & CONCLUSIONS ......................................................................................... 49**|
|6.1 SUMMARY ................................................................................................................... 49|
|6.2 CONCLUSIONS ............................................................................................................ 49|
|6.3 SCOPE FOR THE FUTURE STUDY ........................................................................... 50|
|**REFERENCES ...................................................................................................................... 51**|



viii 

# **LIST OF FIGURES** 

|Figure 1.1: The Hydrological Cycle (Source: www.physicalgeography.net) ............................ 2|
|---|
|Figure 3.1: Map of 12 watersheds and their outlet location ..................................................... 15|
|Figure 4.1: Model Structure of GR4J (source: (Perrin et al., 2003) ) ....................................... 22|
|Figure 5.1: Derived probability distribution of parameters from Multi linear regression ........ 35|
|Figure 5.2: Ensembles of Streamflow Simulation with observed flow in Sugar Creek EdinBurgh|
|watershed. ................................................................................................................................. 36|
|Figure 5.3: Ensembles of soil moisture simulation with soil moisture from GLDAS Sugar Creek|
|EdinBurgh watershed. .............................................................................................................. 36|
|Figure 5.4: Streamflow Simulation for reduced parameter space from the application of soil|
|moisture with regionalization estimates for Sugar Creek Edinburgh watershed...................... 41|
|Figure 5.5: Soil moisture Simulation for reduced parameter space from the application of soil|
|moisture with regionalization estimates for Sugar Creek Edinburgh watershed...................... 41|
|Figure 5.6: Streamflow Simulation with observed flow using soil moisture as simulating|
|variable in the entire range of parameter for Sugar Creek Edinburgh watershed. ................... 44|
|Figure 5.7: Soil moisture Simulation with observed flow using soil moisture as simulating|
|variable in the entire range of parameter for Sugar Creek Edinburgh watershed. ................... 44|
|Figure 5.8: Streamflow Simulation with observed flow using soil moisture as simulating|
|variable in the entire range of parameter for Sugar Creek watershed. ..................................... 47|
|Figure 5.9: Soil moisture Simulation with observed flow using soil moisture as simulating|
|variable in the entire range of parameter for Sugar Creek Edinburgh watershed. ................... 47|



ix 

# **LIST OF TABLES** 

|Table 3.1: Details of the study watershed................................................................................. 15|
|---|
|Table 3.2: Details of physiographic catchment attribute for all watersheds ............................ 18|
|Table 3.3: Details of climatic and soil catchment attribute for all watersheds ......................... 19|
|Table 3.4: Details of land use and morphometric properties for all watersheds ...................... 19|
|Table 4.1: List of parameters of GR4J model with optimal ranges. ......................................... 22|
|Table 4.2: List of parameters of GR4J CemaNeige snow model with optimal ranges. ........... 23|
|Table 5.1:Parameters estimated from hydrological model for all 12 basins ............................ 31|
|Table 5.2: Best fit Distribution of X1, X2, X3, X4 and its parameters for all basins .............. 32|
|Table 5.3: Parameters of statistical distribution from MLR Output ......................................... 34|
|Table 5.4: The probability distribution characteristics of model parameters on pseudo ungauged|
|basin from LOOCV .................................................................................................................. 38|
|Table 5.5: Minimum and maximum NSE from LOOCV analysis. .......................................... 40|
|Table 5.6: Minimum and maximum NSE from LOOCV analysis for reduced parameter space|
|.................................................................................................................................................. 42|
|Table 5.7: Parameter Ranges from regionalization and analysis with Soil moisture ............... 43|
|Table 5.8: Parameters of model for ungauged basin using soil moisture as simulating variable|
|in the entire range of parameter of the model. .......................................................................... 44|
|Table 5.9: Parameters of model for ungauged basin using soil moisture as simulating variable|
|in the entire ranges of the parameters of the model. ................................................................. 46|
|Table 5.10: Parameters of model for ungauged basin using soil moisture as simulating variable|
|in the entire range of parameter of the model. .......................................................................... 47|
|Table 5.11: Parameters of model for ungauged basin using soil moisture as simulating variable|
|in the reduced space of parameter of the model. ...................................................................... 48|



x 

# **CHAPTER 01** 

# **INTRODUCTION** 

### **1.1 GENERAL** 

Water, the basic essential need for the existence of human life in earth, is the important natural resources. The Earth surface was covered with 71% by water serving all forms of life. Among the total water available on the earth surface, the major coverage is in oceans with 96.5%. About 1.7% is available in the form of groundwater, glaciers and ice caps of Antarctica and Greenland contributes 1.7% and 0.001% found in the forms of air vapour, clouds, and precipitation. The freshwater has 2.5% share from the total groundwater and ice and less than 0.3% of the available freshwater is in rivers lakes and atmosphere. (Peter H. Gleick, 1993, Water in Crisis: A Guide to the World's Fresh Water Resources (edited) - Oxford University Press, New York). The abundance use of the water from its available resources affects its extraction from the sources due to change in spatial, temporal availability and quality. 

Water on earth is not stationary. The continuous and the cyclic movement of water on, above and under the earth surface explained through a cycle known as hydrological cycle. The Complete cycle in which the water from the land and ocean moves to atmosphere through evaporation and evapotranspiration from soil and comes back in the form of precipitation can be understand through Hydrological cycle. Hydrologic cycle is a complex cycle not perfectly known that neither has a beginning nor end or a pause but can be understood by system concept. Evaporation, transpiration, interception, infiltration, percolation, and surface runoff are the various processes of hydrological cycle. Figure 1.1 shows a schematic form of hydrological cycle. 

The science of hydrological cycle is studied under a major area Hydrology. The interest on studying the hydrology is to establish confidence in the field of the water resources engineering, biological engineering and agricultural engineering which were extended to environmental and atmospheric studies in recent decades. The quantity and quality of the water in the hydrological cycle are studied and described through fundamental transport theorem. 

1 



<!-- Start of picture text -->
|<br>X ay Th Vath — J | Cacheaton? C<br><!-- End of picture text -->

water resources are known as ungauged basins. The estimation and prediction of hydrological information in these areas is the forefront for hydrologist, researchers, and the decision makers. The runoff water prediction in the ungauged catchment area has challenging in the applications of design of drainage structure runoff forecasting, flood blockage, and management practices such as resource allocation and future climate impact studies. 

The prediction in gauged basins has qualitative improvement with adequate information but it is challenging to predict in ungauged basins due to non-availability of information (Sivapalan, 2003). Continuous streamflow prediction in ungauged basins has been at the forefront of the hydrological sciences over the decades. To address this problem, the International Association of Hydrological Sciences (IAHS) established the “Decade on Predictions in Ungauged Basins (PUB): 2003–2012” (Hrachowitz et al., 2013) aiming to achieve significant advances for predictions in ungauged basins. The paradigm shift in the prediction of streamflow, water quality variables and sediment transportation are the primary goal of PUB. The shift of analysis from traditional methods, calibrated model, statistical analysis towards new techniques understanding physical process of hydrological cycle. 

The scientific research in ungauged basin for hydrological interpretation is framed under different themes such as classification of catchment by similarity comparisons of river basins, re-analysis, and global hydrology. The approach of heterogeneity study of river basins at different spatial and temporal scales by integrating the concepts of traditional estimates and performing uncertainty analysis of the ungauged basin estimates. 

The development of new approaches in the data collection were experimented by the researchers over the large scale using various surface and atmospheric process-based models. The models were improved by developing new hydrological theories based on the system concepts, multi-level and complex scaling, the nonlinear dynamic response and the ecohydrology understanding. 

### **1.3 HYDROLOGICAL MODELS FOR UNGAUGED BASIN** 

The researchers and hydrologists have developed powerful techniques for the investigation of hydrological system for planning and management of integrated management of water resources. The primary objective of hydrological model is to establish the relationship between rainfall and runoff. The development of statistical relationship between the rainfall and the runoff is the early achievement for estimation of the runoff of the catchment. The later research led to development of hydrological model. Hydrological models represent hydrological system as a symbolic and developed through mathematical expressions of known and assumed functions explaining the components of hydrological cycle. 

3 

The simulation of the runoff in the hydrological model is attained by optimization of parameters by calibrating the model. Hydrological models were developed on simple water balance equation leading to the relation between rainfall and runoff. The total runoff leaving the watershed is balanced with the rainfall through hydrological component subtraction of the catchment. Researchers have developed many mathematical models and physical models for predicting the streamflow and providing decision makers a possible solution. The approaches of predicting the basin responses have seen more improvement in the recent years. Over the past decade’s researcher have been focusing on the hydrological models which uses the catchment characteristics to provide better prediction of streamflow. 

Hydrological models simulate the catchment response from the given input. Thus, in ungauged basin, the role of hydrological models in simulating the behaviour of the catchments by considering the physical process of the catchment is important due to non-availability of the hydrometric information. The predictions in the ungauged basin are developed using the extrapolation of the hydrological response from the donor gauged catchments. The input information’s of climatic, physiographic data collected through various direct measurements and estimation through remote sensing products are applied to the hydrological models for estimating the catchment response. 

The spatially classified lumped and distributed hydrological model provides needful information based on their structural performances. The simple structure of a lumped hydrological model which represents the overall response of the catchment is an advantageous tool rather than the complicated distributed structure. The response of the lumped model is spatially aggregated representation of the hydrological characteristics of a watershed, and the parameter values vary with the spatial scales of modelling. The distributed and semi distributed model divides into multiple sub watershed basins and hydrological response units to analysis and account hydrological responses at smaller scales for improved estimation of the parameters as a response of observations to increase the reliability in prediction. 

The streamflow estimation in ungauged basins were using the derived flow analysis such as regional flow duration models. Since the deterministic prediction in the ungauged basins were not valid, the application of the probabilistic model’s structure has been used in ungauged catchments. However, hydrological model involving the hydrological basin and hydrologic cycle response were the recent developments. The development of the spatially distributed and multi-scale modelling considering the models adaption towards the basin scales is the feature theme of prediction in ungauged basin. 

4 

### **1.4 REGIONALIZATION IN UNGAUGED BASINS** 

The study on ungauged basins have provided promising results by transferring the hydrological information from gauged basins to ungauged basins. The transfer of hydrological information is attained through the transformation of hydrological model parameters from the gauged catchments to the ungauged catchments. The transfer of hydrological information has been achieved through regionalisation process. Regionalization approach gained importance in transferring the parameters of gauged basins to ungauged basin. Various approaches have been tested and the most promising and widely used methods remain the hydrological model parameter regionalization approaches.  Multiple donor sites are selected to extract as much information as possible to increase the predictive skill of hydrological models on the ungauged basins. The parameter transferring between the catchments is performed based on the similarity measures between the donor and the target catchments. 

The most applied methods of regionalization techniques are based on regression method, physical similarity, and spatial proximity. The spatial proximity approach uses the interpolation to regionalize the model parameters from gauged watersheds to the ungauged watersheds. This approach assumes that the nearby basins are situated in the uniform area. The watershed characteristics and similar group catchments are used in the physical similarity approach. The most similar donor basin to an ungauged basin is found using this method, which also considers the watershed characteristics of the donor basin, a full parameter set is then transferred from the donor to the matching gauged catchment for hydrological modelling. Regression analysis treats model parameters as dependent variables and watershed features as independent variables. 

Regionalization performed using parameters from gauged site and validating with satellite data have yielded better performance. The quality of regionalization depends on parameter estimation, quality of observations of hydrological characteristics and performance of regionalization methods. However, the uncertainty in regionalization has larger bounds in parameter transformation from gauged basin to ungauged basin. The predictive uncertainty is quantified through parameter uncertainty. The uncertainty due to model structure is considered by choosing the suitable model for the study. Regionalization should account uncertainty associated with the model parameters for efficient streamflow prediction. 

### **1.5 REMOTE SENSING PRODUCTS IN UNGAUGED BASIN** 

The application of passively observed hydrological variable and process-based developed variables in simulating the hydrological model or in establishing statistical relationship with hydrological components have improved more in recent periods. Due to the insufficient and 

5 

inconsistent measure of in-situ streamflow, the use of satellite-based products in simulating the hydrological models helps in estimating the parameters. The validation of prediction in ungauged basin resulted in applying the knowledge of satellite-based data. Researchers have used water level in the streams and reservoir for evaluation of prediction in ungauged basin. The additional information as input for ungauged basin have been considered such as satellite products of water level. 

Based on this approach, researchers have utilized the remote sensing-based data to simulate the streamflow in the ungauged basins. The calibration of hydrological models using different simulation variables, independently and joint calibration with streamflow may improve the performance of the model in parameter estimation. The remote sensing soil moisture and evapotranspiration were used in simulation - optimization framework of hydrological models. The hydrological model selection plays major role in use of soil moisture. The selected hydrological model should yield soil moisture as one of its outputs. The remote sensing products of other hydrological variables can be integrated with the hydrological models for the optimal evaluation of parameters. However, in ungauged basin, the use of remotely sensed data is a valid input due to non-availability of observed flow. The researchers have used the remotely sensed soil moisture and evapotranspiration for calibrating the different of hydrological models. The use of soil moisture along with the observed flow as joint calibration is applicable only in the gauged basin. Thus, focus on use of soil moisture solely in simulating the hydrological model have increased in ungauged basin to improve the prediction skill of the models. 

The integration of regionalization approach with the remote sensing soil moisture in ungauged basin expected to improve the hydrological model prediction. The effectiveness of regionalization approach depends on estimation of parameters from the donor catchments and predictive uncertainty quantification through proper derivation of parameters for the donor catchments. Thus, exploring the simulation of hydrological model for parameter optimization in the ranges of regionalization unmask the hybrid approach of prediction in ungauged basin. 

### **1.6 OBJECTIVES OF THE STUDY** 

The main objectives of this study is to: 

1. Developing a framework by combining regression-based regionalization and remote sensing data for prediction in ungauged basin. 

2. Assess the uncertainty reduction of ensemble predictions by comparing with remote sensing data in the ungauged basin. 

3. Assess the performance of hydrological model simulation using remote sensing products in ungauged basin. 

6 

### **1.7 ORGANIZATION OF THESIS** 

Chapter 01 introduces to prediction in ungauged basin, regionalization in ungauged basin, role of hydrological model and application of remote sensing products in ungauged basin. Chapter 02 focusses on the previous research work related to methods of regionalization, adaptation of different methodologies for prediction in ungauged basin and use of various other sources of observations that can be used for ungauged basin. Chapter 03 elaborate the study area and data collection required for the study Chapter 04 describes about the methodology on which this work is carried out. Chapter 05 includes the results of the present study discussion of the results. Chapter 06 provides the summary, important conclusion derived from the present study. 

7 

# **CHAPTER 02** 

# **REVIEW OF LITERATURE** 

### **2.1 HYDROLOGY** 

The structure or volume in space surrounded by boundary accepting water and other inputs and operates internally and produces as outputs having boundary in three-dimensional space is called hydrological system (Chow et al., 1988) 

All forms of water reaching the earth surface from the atmosphere is termed as precipitation. The term "runoff" refers to the drainage of precipitation from a catchment area through a surface channel after satisfying all surface and subsurface losses. (Dubayah and Loechel, 1997) 

The calibration of direct runoff data cannot be used to acquire the parameters of rainfall runoff models in ungauged basins. Alternative approaches must be used to obtain the parameters for these catchments (Sivapalan, 2003). 

### **2.2 HYDROLOGICAL MODELLING** 

The elements of a hydrologic cycle are expressed by symbolic or mathematical representations of known or imagined functions, known as hydrologic models (Beven and Kirkby, 1979). The planning and development of an integrated approach for managing water resources, performed by hydrologists and water resources professionals involved in the hydrological modelling defined the hydrologic system investigation (Bergstrom, 1991). 

As early as the middle of the nineteenth century, the development of runoff-rainfall models experimented (Mulvaney T, 1851). Sherman, (1932) developed the concept of the unit hydrograph using the superposition principle. The superposition principle included number of presumptions. It is developed on the concept of linear relation between rainfall and runoff. 

According to Dooge, (1957) the researchers and the engineers developed empirical relations for the experiment cases and assumptions and applied to the other cases. Snyder, (1938) have developed empirical runoff hydrograph for the computation in ungauged basin. The researchers have developed traditional lumped, conceptual rainfall-runoff models using mathematical equations representing hydrological processes, e.g., HEC - 1 model (Rockwood, 1966), the SACRAMENTO model (Burnash, 1973), and the XINANJIANG model (Zhao, 1980). 

The physical process of the hydrological cycle was incorporated in the development of hydrological models called physical based models such as SHE (System Hydrologique European) a fourth-generation model MIKE SHE (Refsgaard and Storm, 1990) developed to 

8 

apply for integrated water resource management. The areas of the applications of the model includes the river basin planning, irrigation and drainage, effects of change of land use, water supply and other surface and groundwater system. 

The selection of modelling depends on the simulation objective, where obtaining the accuracy of prediction with the help of supporting data particularly rainfall and streamflow observations. The general streamflow observations at any location (one point) in the catchment is sufficient to obtain the response of the catchment (Wagener and Gupta, 2005). 

Geetha et al., (2007) computed direct runoff using SCS curve number method in different Indian basins. The Antecedent Moisture Condition (AMC) is analysed and used to compute the longterm runoff related with antecedent duration. 

Jha, (2008) estimated the hydrological characteristics of the ungauged basin form climatic and physiographic catchment parameters using different techniques. The parameters are estimated using observed climatic data. 

### **2.3 HYDROLOGICAL MODELS OF UNGAUGED BASINS** 

(Castellarin et al., 2004) have used regional flow duration curves (FDC) in the ungauged sites and analysed the uncertainty of the regional FDC’s identified that empirical FDC’s have better performance than long-term FDC’s and regional FDC’s. Arora et al., (2005) conducted the regional flow duration curve in Himalayan snow river basin considering as ungauged site. The parameter regionalization is performed for the simulation of flow in the study. 

McIntyre et al., (2005) used probabilistic ensemble model approach using the daily data and transformed the model to the ungauged catchments in United Kingdom. Kapangaziwiri et al., (2012) used model independent continuous streamflow simulation in the ungauged catchments of South Africa and performed the uncertainty estimation by deriving the priori parameters. 

Boughton and Chiew, (2007) used AWBM model to estimate the daily runoff relating the annual runoff to the annual average rainfall and potential evapotranspiration for the 213 ungauged catchments of Australia. 

### **2.4 REGIONALIZATION IN UNGAUGED BASIN** 

The hydrological models are used to estimate the parameters of the gauged basin. The parameters are transferred to the ungauged basin by the method of regionalization. The process of regionalization has been carried out in three most common methods such as spatial proximity, physical similarity, and regressive regionalization. The spatial proximity method 

9 

considers that nearby catchment as homogenous and transfer the parameter with the use of different interpolation techniques such as inverse weighted method. 

Narbondo et al., (2020) used physical similarity approach by choosing ungauged watershed which is of similar catchment characteristics and meteorological characteristics.  The complete hydrological information has been transferred from the donor catchment to the ungauged catchment. 

Song et al., (2016) used the regression-based regionalization establishing a strong regression relationship between the estimated parameters of hydrological model and catchment attributes to develop and regression model which estimates the parameter of ungauged catchment in the form of regionalisation which is helpful in simulating the streamflow. 

Kong et al., (2019) used Topographic Kinematic Approximation and Integration (TOPKAI) model to calculate the parameters in gauged basin. The parameter estimated from the hydrological models from gauged basin are not sensitive for prediction. The sensitivity analysis is conducted to identify the sensitive parameters in which the complete set of identified parameters are transferred to ungauged basin. 

The parameter transferability of hydrological model has been studied for homogenous watersheds for increasing the predictive nature of streamflow. Chouaib et al., (2018) found that the transfer of data between the homogenous catchment is good performance but the transferring parameters from heterogenous catchments have little improvement in prediction. 

Bao et al., (2012) compared the similarity and regression-based regionalisation using hydrological model considering large number of catchments of different climatic conditions and found out the similarity approach increasingly performing. 

The power of machine learning towards the improvement of prediction in ungauged basin has been studied by Kratzert et al., (2019) with the help of Long short-term memory (LSTM) networks. The model is calibrated with the hydrological model and the output is used in machine learning models. The performance of the methodology is significant with the static catchment attributes. 

The Artificial neural networks have good potential in estimating streamflow with precipitation and temperature data in which the inconsistency of data is rectified. Besaw et al., (2010) estimated the streamflow of gauged basin and considered the simulated flow as input to ANN for ungauged basin. The ANN converge well with the help of basin characteristics data. 

10 

The global estimate of uncertainty is transferred from gauged basin to ungauged basin by Bourgin et al., (2015) and estimation of uncertainty is assessed using three qualities: reliability, sharpness and overall skill 

Development of multi modelling approach increases the confidence of streamflow estimation with the help of combining the different approaches of regionalization (Razavi and Coulibaly, 2016) like hydrological modelling and data driven modelling approach to establish an ensemble set of prediction. The combination of physical similarity approach of regionalization with data drive techniques and hydrological model will give different set of results in ungauged basin. The ensemble of the set provides a strength of prediction in ungauged basin 

The probability derivation of parameter for the ungauged basin has up-hand on the uncertainty study. The Bayesian likelihood approach differential evolution metropolis algorithm (DREAM) have proved to be helpful in many basins (Estacio et al., 2021; He et al., 2011) around the globe addressing the different sources of uncertainty in regionalization approach. 

The regional study conducted in Ireland by Golian et al., (2021) considered number of watersheds and performed statistical methods of regionalization such as multiple linear and nonlinear regressive regionalization. The comparison is made with the machine learning techniques. 

Regionalization of parameters directly to the ungauged watersheds accounts for more uncertainty. The quantification of uncertainty associated with the parameters is performed by deriving the probability distribution of parameters and regionalized by regression method with catchment attributes. Athira et al., (2016) derived the pdf of parameter and established a nonlinear relationship with the attributes and yielded an ensemble streamflow prediction. 

Du et al., (2020) used satellite observation of water level in the geopolitically ungauged basin at sub continental scale. The regionalization based on hydrological similarity used remote sensing precipitation as an additional input and improved the efficiency of streamflow prediction. 

However, attempt of using different input methods have exercised in ungauged basin but inadequate data for validating the performance in ungauged basin increases. van Emmerik et al., (2015) used irrigation and hydrological model to calculate the simulated streamflow. The estimated streamflow is separated as reservoir outflow and reservoir level. The reservoir level is validated with the measured water level and for better prediction in ungauged basin. 

Even though the estimation of model parameters has achieved a greater extent, these parameter sets undergo spatial and temporal variations. The variation of parameter affects the 

11 

transferability to ungauged basin. Jayathilake and Smith, (2020) did hydrological signature analysis to predict the temporal transfer of parameters. 

### **2.5 REMOTE SENSING DATA IN UNGAUGED BASIN** 

Though the hydrological model performs promising in regionalization, the role of increasing the input factors that updates the initial state of the model helps in more finetuning during calibration in estimation of parameter. The alternative input such as soil moisture helps in more finetuning during calibration for the estimation of parameter. 

Researchers have used soil moisture (Laiolo et al., 2016; Thorstensen et al., 2016), evapotranspiration (Nandagiri, 2007; Rientjes et al., 2013), and water level in stream and reservoir (Bogning et al., 2018; Huang et al., 2020) to improve the model performance in the ungauged basins. 

The joint calibration of streamflow with soil moisture removes the deficit of model initial performance. Silvestro et al., (2015) used the soil moisture in calibrating the hydrological model and assessed the uncertainty reduction. 

The joint calibration of streamflow with soil moisture removes the deficit of model initial performance. Shahrban et al., (2018) conducted his research in semi-arid and sub humid climate on two conceptual model and addressed the increase in predictive skill for streamflow. The comparison of models has provided information on the efficiency of models which helps in carrying the future research depending on the model structure. 

Most of the conceptual model does not account for soil moisture due to their structure. The sequential assimilation of soil moisture and streamflow data conducted by Aubert et al., (2003) in a conceptual model gives enhanced knowledge on providing the soil moisture as input to a conceptual model. 

Some of these studies have used the remote sensing data to validate the performance of the regionalized models in the ungauged basin. For instance, Du et al., (2020) used the water level in the river basin and the reservoir from satellite observation in the geopolitically ungauged basin at sub continental scale. The results of the study show that regionalization through hydrological similarity performed better 

Researchers (Kunnath-Poovakka et al., 2016; Milzow et al., 2011; Parajka et al., 2009; Sutanudjaja et al., 2014; Willem Vervoort et al., 2014) have used passively observed sub surface fluxes such as soil moisture and evapotranspiration to calibrate the hydrological models. 

12 

Rajib et al., (2016) found acceptable streamflow prediction calibrating soil moisture and the streamflow together particularly in low flow seasons, however the impact of bias associated with soil moisture supresses the performance. Li et al., (2018) used soil moisture as simulating variable in joint calibration, the results indicated slight degradation in streamflow simulation in gauged catchments. The studies clearly states that the soil moisture simulation is better estimating for low flows and under estimating in high flows/peak flows. 

Although researchers have used the remote sensing-based data to calibrate the hydrological models, their performance is not same as that obtained from the streamflow calibration alone (Kunnath-Poovakka et al., 2016; Rientjes et al., 2013). However, the application of the satellite data has been useful in improving the streamflow predictions in the ungauged basins. 

### **2.6 SUMMARY OF LITERATURE** 

From the preceding discussion, it is evident that the predictions from ungauged basin can be obtained from regionalization techniques and by application of remote sensing data. While the regionalization techniques suffer from the large predictive uncertainty, models calibrated from the remote sensing data could be further improved. The different methodologies employed for the continuous simulation of the streamflow in the ungauged basins suggest that the use of regionalization provides the valuable prediction. The statistical approach, regression-based regionalization has proved to effective in the uncertainty quantification. Since the regionalization attained through the parameter transformation, the predictive uncertainty is quantified by parameter uncertainty. 

Though the use of remote sensing products has used in the calibration of the hydrological models in gauged basins, its application in the ungauged basins have to be explored. The probability applied to the parameters for accounting uncertainty can be integrated to the hydrological model parameter optimization for the better estimation of parameters in ungauged basins. In this study, we test the hypothesis that the combination of the regionalization techniques with remote sensing data could result in better predictions in ungauged basins with reduced prediction uncertainty. 

13 

# **CHAPTER 03** 

# **STUDY AREA AND DATA COLLECTION** 

### **3.1 THE STUDY AREA** 

The study area for the present work includes twelve watersheds in US basins. The location of the watersheds is two from the state of Kentucky, one from Illinois and nine from Indiana.  The watersheds spread over the boundaries of 83˚W to 88˚W longitudes and 37˚N to 42˚N latitudes. These watersheds belong to Ohio hydrologic region classified by United States Geological Survey (USGS). The drainage area of the watersheds ranges from 1200 Km<sup>2</sup> to 4400 Km<sup>2</sup> . Figure 3.1 shows the location map the study area and its flow measuring station. The identified watersheds are potential MOPEX (Model Parameter Estimation Experiment) watersheds an international project affiliated by International Association of Hydrological Sciences (IAHS) for Predictions in Ungauged Basins (PUB) and is supported by individual participants as well. The watersheds are selected for this study on the basis of climatic and similar hydrological indices such as runoff coefficient and aridity index. Table 3.1 provides the details of watershed used for this study with station Id, Station name, drainage area and runoff coefficient. 

##### **3.1.1 Topography** 

The topography of the watersheds includes hilly region and plain regions. The mean elevation of all the watersheds is ranging from 190 to 370 m having less slope on the entire area. The watershed in the northern latitudes comes under snow dominant area where the southern study watersheds are less exposed to snow covering. 

##### **3.1.2 Land use/Land cover** 

The land cover of all the catchments is largely cultivated. Around 70% of the area is covered with forest in nine watersheds. Rolling Fork watershed and Blue River watershed are almost equally shared forest and cultivated area. The major land use of South Fork Kentucky watershed is covered with forest. 

##### **3.1.3 Drainage** 

The watersheds of the study area are located between the Great plains in the west and Appalachian Mountains in the east geologically. Though the outlets of the watersheds were on 

14 



<!-- Start of picture text -->
beat}<br>NS USGS ID<br>HH 03301500<br>HE 03303000<br>[J 03326500<br>[MS 03328500<br>ME 03331500<br>HE «03339500<br>HESS 03345500<br>[1] 03361500<br>y HE[] 033 490625 00<br>© Outlet<br>i HE 03364000<br>ees Kilometers <<br><!-- End of picture text -->

##### **3.1.4 Soil** 

The soil classification on the study area is observed as percentage share of clay, silt and sand. The major soil content is silt followed by clay and sand in all the watersheds. The dominant soil texture is observed in two-layer condition. The dominant soil texture for 0 to 150cm is loam, silty clay loam in major watershed. The dominant soil texture for 0 to 250cm is Bedrock. 

##### **3.1.5 Climatic conditions** 

The climatic condition of the study area is sub-tropic humid climate conditions. The annual average precipitation of all the watersheds ranges from 900mm to 1200mm. The mean annual temperature of all the basins having minimum of 9˚C to the maximum of 14˚C. 

### **3.2 DATA COLLECTION** 

##### **3.2.1 Simulation Data** 

The major dataset for the present study is obtained from MOPEX internet portal. The primary objective of MOPEX initiative is to frame various methodologies for the priori estimation of the parameters in hydrological models. The MOPEX have assembled large number of highquality historical datasets of meteorological and river basin characteristics throughout the world. MOPEX data sets for the US basins are downloadable from <u>(https://hydrology.nws.noaa.gov/pub/gcip/mopex/US_Data/).</u> MOPEX initiative have identified 438 potential watersheds US river basins with availability of complete meteorological data, streamflow data and basin characteristics. 

The required observation for the study includes precipitation, potential evapotranspiration, temperature, streamflow data for gauged basins and soil moisture data for ungauged basin. The meteorological data of precipitation (mm/day), maximum and minimum temperature (<sup>o</sup> c) and potential evapotranspiration (mm/day) can be obtained from the MOPEX portal. The station wise daily streamflow (mm/day) for the study area watersheds can be obtained from aforementioned portal from 1948 to 2001. 

##### **_3.2.1.1 Rainfall_** 

The MOPEX initiative collected and assembled precipitation datasets of hourly and daily timescales from 1948 to 2001 from the observations of National Climatic Data Centre (NCDC) <u>(http://www.ncdc.noaa.gov/)  and Natural Resources Conservation Service (NRCS) SNOTEL</u> network <u>(http://www.wcc.nrcs.gov/factpub/-sntlfct1.html). The precipitation data were</u> aggregated to the whole basin using inverse distance interpolation algorithm. Thus, the mean areal precipitation estimates are presented below for all the basins. 

16 

##### **_3.2.1.2 Temperature_** 

The maximum and minimum temperatures observed at NCDC stations and at SNOTEL sites were used for temperature analysis on daily timescales. The interpolation procedure of temperature over the basin is processed same as precipitation to estimate the mean areal maximum and minimum daily temperature. 

##### **_3.2.1.3 Potential evapotranspiration_** 

The potential evaporation for the basins by the MOPEX initiative is developed based on climatological index and temperature index. The estimates of mean daily potential evaporation were made for each basin based on the estimates from the NOAA Evaporation Atlas. The evaporation pan data analysis is performed using the NOAA Evaporation Atlas maps. Temperature index for the estimation of potential evaporation considers the Hargreaves method (Jensen et al., 1990). The analysis uses daily maximum and minimum air temperature data to estimate the potential evaporation for the basin. 

##### **_3.2.1.4 Streamflow_** 

The streamflow values are derived from the gauge data form US Geological Survey (USGS) stream gauge network. The flow data at all the gauges were collected analysis the river basins not affected by the upstream flow regulations and the recorded on the basis of long-term application for future studies. 

##### **_3.2.1.5 Soil moisture data_** 

The present study is proposed to use the soil moisture data for the simulation of hydrological model in ungauged basin. The remotely sensed soil moisture data is obtained from Ground Land Data Assimilation System (GLDAS). The gridded data of rootzone soil moisture with 0.25° x 0.25° resolution from GLDAS Catchment Land Surface Model V2.0 is used for the simulation. 

##### **3.2.2 Catchment Attributes data** 

The catchment attributes considered for this study in regionalization includes climatological characteristics, physiographic characteristics, Land use and soil characteristics and morphometric characteristics. The availability and the sources of the required data are discussed below: 

##### **_3.2.2.1 Physiographic Data_** 

Physiographic attributes considered for this study includes drainage area of the watersheds (km<sup>2</sup> ), mean elevation and percentage of slope. The physiographic data were processed and estimated from Shuttle Radar Topography Mission (SRTM) digital elevation models of 30m 

17 

resolution tabulated in Table 3.2. The drainage area of the watersheds ranges from 1000 – 4000 km<sup>2</sup> approximately. 

Table 3.2: Details of physiographic catchment attribute for all watersheds 

|**S**|**USGS ID**|**Phy**|**siographic**<br>||
|---|---|---|---|---|
|**.no.**||**Area Calculated (Km2)**|**Mean**<br>**Elevation (m)**|**Mean Slope**<br>**(%)**|
|1|03281500|1644.95|365.14|14.00|
|2|03301500|3550.71|237.52|6.92|
|3|03303000|1133.93|240.88|6.73|
|4|03345500|3842.37|195.98|3.16|
|5|03364000|1623.43|277.92|4.69|
|6|03362500|767.42|250.19|4.43|
|7|03361500|1072.62|295.33|5.04|
|8|03349000|1991.11|275.02|3.70|
|9|03339500|1117.95|270.78|3.70|
|10|03326500|1908.27|286.95|4.20|
|11|03328500|2392.59|257.91|5.68|
|12|03331500|2192.30|253.75|5.68|



##### **_3.2.2.2 Climatological Data_** 

The climatological attributes such as mean annual precipitation (mm), mean annual temperature, aridity index was considered in this study. The climatological data from Table 3.3 were processed data from MOPEX data sources indicating the mean annual precipitation for all the basins vary from 900mm to 1200mm and the mean annual temperature from 9˚C to 14˚C. 

##### **_3.2.2.3 Soil attributes_** 

The soil information provided by Soil Survey Geographic (SSURGO) is used calculate the percentage share of clay, silt and sand for all the basins. As discussed earlier, most of the basin have higher silt content sharing and almost equal percentage of clay and sand. The estimated percentage of soil information are tabulated in Table 3.3. 

##### **_3.2.2.4 Land use and Morphometric information_** 

The Land use information such as percentage of forest area, cultivated area, built-up area was used in this study estimated from National Land Cover Database (NLCD) 2001 and morphometric attribute shape factor is calculated for all the basins from Table 3.4. 

18 

Table 3.3: Details of climatic and soil catchment attribute for all watersheds 

|||**Mean**|**Climatic**<br>**Mean**||**Soi**|**l Informat**|**ion**|
|---|---|---|---|---|---|---|---|
|**S. no.**|**USGS ID**|**Annual**<br>**Precipitation**|**Annual**<br>**Temperature**|**Aridity**<br>**Index**|**%Clay**|**%Sand**|**%Silt**|
|1|03281500|1219.09|12.92|1.53|25.41|30.69|43.89|
|2|03301500|1211.55|13.34|1.38|32.36|12.24|55.40|
|3|03303000|1123.22|12.88|1.28|32.30|12.11|55.58|
|4|03345500|982.22|11.91|1.05|30.27|16.47|53.25|
|5|03364000|1026.20|11.00|1.20|27.09|22.77|50.13|
|6|03362500|1036.44|10.90|1.21|29.36|25.51|45.12|
|7|03361500|1030.41|10.75|1.20|28.46|26.54|44.99|
|8|03349000|975.75|10.48|1.13|29.83|21.01|49.15|
|9|03339500|982.96|10.96|1.13|29.48|20.23|50.28|
|10|03326500|963.66|10.26|1.11|32.69|20.24|47.06|
|11|03328500|945.25|9.94|1.08|28.78|32.42|38.80|
|12|03331500|938.40|9.81|1.07|20.48|50.40|29.11|



Table 3.4: Details of land use and morphometric properties for all watersheds 

|**S. no.**|**USGS ID**|**Land**<br>|**use Informati**<br>|**on**<br>|**Morphometric**<br>|
|---|---|---|---|---|---|
|||**%Forest**|**%Built**|**%Agri**|**Shape factor**|
|1|03281500|87.85|5.53|5.11|5.23|
|2|03301500|51.60|5.47|41.77|5.65|
|3|03303000|45.66|6.87|46.54|8.85|
|4|03345500|11.35|6.90|80.62|7.68|
|5|03364000|8.14|8.18|82.64|11.93|
|6|03362500|6.08|16.84|75.59|5.06|
|7|03361500|10.38|9.45|77.96|6.63|
|8|03349000|5.76|13.93|77.84|5.85|
|9|03339500|5.50|7.95|85.12|5.20|
|10|03326500|8.08|10.61|78.90|4.83|
|11|03328500|11.65|8.23|75.48|11.82|
|12|03331500|8.85|8.94|73.06|6.78|



19 

# **CHAPTER 04** 

# **METHODOLOGY** 

This chapter explains about the use of hydrological model and evolutionary algorithm in deriving the parameter distribution and the development of regression-based regionalization. 

### **4.1 HYDROLOGICAL MODEL** 

##### **4.1.1 Genie Rural a 4 parameters Journalier (GR4J) model** 

The Genie Rural a 4 parameters Journalier (GR4J) model (Perrin et al., 2003)  was selected for this study. GR4J model is a catchment scale, conceptual model working on simple water balance equation. The model was developed at CEMAGREF (Centre for the Study of Agricultural Machinery and Engineering Rural Water and Forests), France. The GR4J model has been widely applied in the greater number of watersheds in France, Australia, Brazil, and the United States. The application of the GR4J model is performed in the areas of management of dams and flow flood prediction 

GR4J is four parameter lumped model has two states of runoff generation, a soil moisture store regulating the water balance of the model and a routing store regulating the water transfer of the model. The GR4J model works on the daily time scale. Rainfall (P) and potential evapotranspiration (PET) are inputs to the model. The model produces streamflow (Q) and actual evaporation (Es) as the outputs. 

The production store is the soil moisture store having its maximum capacity (X1), stores rainfall and loses water as evapotranspiration and percolation. The production component classifies each day as wet day when P > PET contributing net rainfall (Pn) and zero net evapotranspiration (En) or dry day when P < PET contributing a net evapotranspiration and zero net precipitation. The rainfall after initial abstraction contributes as net rainfall, a part of the rainfall (Ps) given by Eq. (1) will end in the production store and remaining (Pn – Ps) contributes to direct runoff. For the dry days with En not equal to zero, the actual evaporation rate is estimated as Es by Eq. (2). Then level of production store (S) is updated by using (3) not exceeding its maximum capacity (X1). 

20 



Percolation (Perc) from the production store related using Eq. (4), together with the remaining net precipitation, reaches the routing component of the model. After percolation the production store becomes Eq. (5) 





The sum of waters (Pr) from percolation and the direct runoff contribution is available for the routing phase. It is divided into: 90% responsible for slow runoff routed through a unit hydrograph (UH1) and a routing store, 10% contributes to direct runoff (Qd) routed through a unit hydrograph (UH2) derived by equation Eq. (6) & Eq. (7)(7) 





Where SH1(j) and SH2(j) are the ordinates of S – curve. UH1 and UH2 have the same base time base (X4), the time base of rising limb of the unit hydrographs. 

The routing storage (X3) is the amount of water stored in the soil pores which is influenced by the soil humidity and its type. X2, the ground water coefficient is a function (F) of groundwater exchange influencing the routing store. In the nonlinear routing the outflow (Qr) of the routing store is governed by Eq. (8)  and the level of the reservoir is updated from Eq. (9) 





The total streamflow of the model is calculated using Eq. (10) 



The optimal ranges of the hydrological model are tabulated in Table 4.1 and the Figure 4.1 shows the structure of GR4J hydrological model. 

21 



<!-- Start of picture text -->
2 &P_ interception<br>En P—~<br>Es Ps. Pr-Ps<br>—<br>~ Perc Pr<br>_— ~~<br>0.9 0.1<br>J A<br>x4 2.x4<br>a9 Ol<br>F(x?<br>2 me [ev<br>on Od<br><!-- End of picture text -->

coefficient. The module begins by using the thermic state of the snow cover and the temperature to calculate the potential melted water (maximum snow quantity that can melt). The amount of snow that melts rely on a number of variables, including the potential melt that was previously computed, the snow-covered surface, and the minimum melt speed when the storage is very low. The snow store is then updated by deducting the amount of melted snow. The snowmelt available for the hydrological model contains the liquid fraction and the melted water. 

Table 4.2: List of parameters of GR4J CemaNeige snow model with optimal ranges. 

|S. no.|Parameter|Descriptions|Range|
|---|---|---|---|
|1|CNX1|weighting coefficient for snowpack thermal state [-]|(-3) - 3|
|2|CNX2|degree-day melt coefficient [mm/°C/d]|0 - 20|



##### **4.1.3 Calibration** 

The calibration of the conceptual model is required to determine appropriate parameter values. The objective function for the calibration of hydrological model Nash Sutcliffe Efficiency defined in Eq. (11) which calculates the relative magnitude between residual variance and measured variance. The calibration algorithm runs to maximize the objective function to estimate the best parameter set. 



### Qobs is the observed discharge; Qsim is simulated discharge; 𝑄̅obs 

##### **4.1.4 Model Validation** 

The estimated parameter set from calibration output is analysed to understand the performance of the model during the validation period by estimating the simulated discharge. The validation performance is computed using the performance metrices Nash Sutcliffe Efficiency (NSE) 

##### **4.1.5 Optimizer** 

The GR4J model has four parameters, and the snow module has two parameters having the defined optimal range specified in Table 4.1 and Table 4.2. It is necessary to calibrate the model by optimizing the parameters to estimate the best fit parameter set. The optimization algorithm described by Michel (1991) is used to optimize the GR4J model parameters. The optimization algorithm runs by combing local and global search method. The search starts from the list of parameters which is the range of the model parameters. The steepest descent gradient search method is followed from the result of screening. The optimization algorithm maximizes the objective function and stops when the parameter reaches its optimum value. 

23 

##### **4.1.6 Differential Evolution optimizer** 

Differential Evolution (DE) is a global optimization search heuristic algorithm working for minimization problem (Storn and Price, 1997). Differential Evolution works on the principle of genetic algorithm (Price et al., 2006). Differential evolution solves optimization problems by evolving a population of potential solutions by using modification and selection operators, floating-point encoding of population members rather than bit-string encoding, and arithmetic operations rather than logical operations in mutation. Differential Evolution does not require that the function be either continuous or differentiable, making it particularly well-suited for finding the global optimum of a real-valued function with real-valued parameters. 

In this algorithm, NP assumed as the number of parameter vectors in the population. The initial generation are created by performing guesses of NP in the optimal value of the parameter vector, either using random values between lower and upper bounds (defined by the user) or using values given by the user. The weighting factor F, and the cross over probability CR influences the parameter optimization in this genetic algorithm. The choice of NP is selected as 10 times of the number of parameters with the initial (default) weighting factor F = 0.8 and cross over constant CR = 0.9. The initialization of parameter is selected exploiting the full range of the parameter avoiding diversity. The convergence in the optimization can be controlled by changing the values of the NP, with only slight adjustment in the F. The sensitivity of the DE optimizer depends on the choice of F and CR having robust results in parameter optimization. 

### **4.2 DERIVATION OF PDF OF THE HYDROLOGICAL MODEL PARAMETERS** 

The deterministic estimation of parameters of the hydrological model for simulating the flow as output does not explain the uncertainty associated with the parameters of the hydrological model. Thus, the researchers have constantly worked to derive the parameters of the hydrological model in an evolutionary way to account the parameter uncertainty of the hydrological model in hydrological prediction. The derivation of parameters of the hydrological models is achieved through the Markov Chain Monte Carlo simulation. In this study an evolutionary based algorithm called Differential Evolution Adaptive Metropolis algorithm (DREAM) is used to derive the probability density of the hydrological model parameters. 

##### **4.2.1 Differential Evolution Adaptive Metropolis algorithm (DREAM)** 

Differential Evolution Adaptive Metropolis (DREAM) algorithm (Vrugt et al., 2009) is a multichain Markov chain Monte Carlo (MCMC) simulation approach displays good sampling efficiency on complicated, high dimensional, and multi-modal target distributions and automatically adjusts the scale and orientation of the proposal distribution on the route to the 

24 

target distribution. The Shuffled Complex Evolution Metropolis method is modified in DREAM, which has the benefit of preserving ergodicity and detailed balancing. Benchmark tests have demonstrated that DREAM is superior to other adaptive MCMC sampling techniques and even offers better answers than conventional optimization algorithms in high-dimensional search and variable spaces. 

DREAM is a formal Bayesian approach using Markov Chain Monte Carlo (MCMC) scheme. Bayesian statistic estimation using Monte Carlo sampling for uncertainty of parameters is a simple way to combine multiple probability distributions (prior and posterior) using Bayes theorem. The DREAM algorithm runs multiple chains simultaneously for the exploration of posterior density under global optimization. This scheme is an adaptation of the SCEM-UA global optimization algorithm (Vrugt et al., 2003). The posterior distribution considers the measurement errors as independent from the likelihood function following Gaussian distribution taking the following form Eq. (12) 



where, p(θ) is the prior distribution following the uniform distribution in the range of 2 parameters. 𝜎𝑒 is the variance of the errors. The log-likelihood is maximized instead of likelihood function for algebraic simplicity taking the form of Eq. (13) 



Since this formulation considers the errors as independent which is not realistic to hydrological modelling an approach of accounting correlated errors partially is attained using first order autoregressive (AR) schemes using Eq. (14) 



where 𝜌 is the first-order correlation coefficient, and 𝜈 is unexplained error with zero mean and constant variance. The AR-1 corrected time series of residuals is then updated as in Eq. (15) 



with 𝜀0 = 0 the AR-1 model is formulated into the log-likelihood function as in Eq. (16) 

25 



In the Bayesian approach the uniform prior for q is assumed. The first-order AR formulation accounts for autocorrelation in the residuals, and thus the effect of model structural error changes to Eq. (17) 



The forcing errors in the hydrological modelling are treated by assigning rainfall multipliers to each individual storm event in the forcing time series explained by (Vrugt et al. 2008). Unfortunately, in many hydrologic studies, the probability distribution cannot be derived through analytical means or by analytical approximation. The samples are generated from the posterior probability distribution by iterative approximation using Monte Carlo sampling. 

##### **4.2.2 Markov Chain Monte Carlo Simulation with DREAM** 

The most reliable and efficient approach in deriving the posterior probability distribution function of parameters and prediction of model output is through MCMC simulation. The proper statistical function of MCMC in finding behavioural models using formal likelihood function, appropriately sampling the high-probability-density region of the parameter space and separates behavioural from nonbehavioral solutions using a cut-off threshold based on the sampled probability mass, and thus underlying probability distribution. DREAM algorithm is global search algorithm running multiple chains simultaneously and automatically tuning the scale and orientation of the proposal distribution during the derivation to the posterior distribution. This scheme is excellent for complex, highly nonlinear, and multi-level distributions. 

The initial population are generated from the prior distribution using the Latin hypercube sampling procedure. The iterative (n) procedure of sampling follows convergence of parameter space drawn using the Gelman Rubin static (Gelman et al., 1992) with m parallel chains estimated by Eq. (18) 

26 



Here, d is the degrees of freedom estimated by method of moments, W is the mean of the empirical variance and Vh is the variance of Bayesian credible interval in convergence diagnostic is based on the assumption that the target distribution is normal estimated from Eq. (19) and Eq. (20) 



2 𝜎ℎ is the empirical variance from all chains combined calculated as Eq. (21) 



The behavioural set of the parameters are derived as the marginal density for posterior distribution from each chain of the MCMC sampling. The derived probability density function of all the parameters is best fitted to statistical distribution and its location, shape and scale parameters are estimated. The best fitted distribution is identified based on the Akaike Information Criterion (AIC) where lower the AIC indicates best distribution. 

### **4.3 REGRESSION BASED REGIONALIZATION** 

The regression-based regionalization is established between the PDF of parameters and catchment characteristics. The catchment attributes characterize the hydrological response of the catchment. A multi-linear regression relationship is established between the selected catchment attributes and the characteristic of the PDF of the parameters for the gauged basins. The established relationship is used to estimate the characteristics of the PDF of the hydrological model parameters in the ungauged basin. 

##### **4.3.1 MULTIPLE LINEAR REGRESSION** 

The multi linear regression (MLR) model is the regression relationship between one dependent (response) variable and multiple independent (explanatory) variables. The general form of the MLR model follows the following Eq. (22) 



Here the Y is the response variable, A1, A2,.., Ap-1 are explanatory variables and 𝛽 is the coefficients of  MLR. The model is fitted using the linear least square. The parameter of the MLR 𝛽𝑗 is the mean variation in Y per unit change in Aj and the variables A are held constant. The linearity of a multiple regression model is defined with respect to the regression 

27 

coefficients. It is assumed that the explanatory variables are known and are error-free but the response variable is treated as a random variable. 

The MLR Model is represented in matrix form for solving the regression equation in the form of Eq. (23) and having the mean value as Eq. (24) 





The solution of least square can be obtained from by minimizing the square of the error given by the Eq. (25) 



the sum of squared errors is differentiated partially with respect to the unknown parameters which are equated to zero. Thus, the estimated mean (Eq. (26)) and the residual (Eq. (27)) is given as 





The selection of explanatory variables is depending upon the linear relationship between parameter and each attribute. R<sup>2</sup> is the criteria to find the performance of multiple linear regression. 

### **4.4 LEAVE ONE OUT CROSS VALIDATION** 

Leave One Out Cross Validation is type of cross validation in which each observation is treated as the validation set in this method, while the remaining (N-1) observations are treated as the training set. One observation validation set is used in LOOCV to fit the model and predict. Additionally, doing this for every observation as the validation set N times. This method helps to reduce bias and randomness. In this study the one watershed is considered as the pseudo ungauged watershed, and remaining watershed are used to develop the MLR model. The process is repeated for all the remaining 11 basins as pseudo ungauged basin and remaining watershed are used to develop the MLR model. 

### **4.5 SIMULATION WITH REMOTE SENSING DATA** 

The remotely sensed soil moisture is used as an input in ungauged basin for the hydrological model simulation. The ensemble streamflow prediction after regionalization was assessed with the remote sensing soil moisture in ungauged basin. The reduction in the ensemble band of streamflow prediction is observed and analysed. 

28 

The remotely sensed soil moisture is obtained from Ground Land Data Assimilation System (GLDAS) from NASA. The dataset have different products, and root zone soil moisture of 0.25° x 0.25° resolution from GLDAS Catchment Land Surface Model V2.0 is used in this study. The root zone soil moisture product gives the soil moisture for the soil profile in the top 100-150 cm, which is similar to the production store simulated in the GR4J model. Spatial average of the data was considered in the simulations, as lumped conceptual model was used in this study. The satellite observed soil moisture data obtained from GLDAS contains an equal band of bias as compared with the model simulated soil moisture, which necessitates the bias correction (Kumar et al., 2012). In this study, mean-variance matching method is used, owing to its simplicity as compared to complex methods derived and tested in the literature (Nayak et al., 2021).  The bias corrected soil moisture is obtained as given in Eq. (28) 



Where, SMC is the bias-corrected soil moisture, SMS and SMOM are mean of the modelsimulated and GLDAS soil moisture and SMO is GLDAS soil moisture and σs and σo are standard deviations of the model-simulated and GLDAS soil moisture. Since the model simulated soil moisture was not available, the average of the SMs and σs for all the gauged basins was used for the ungauged basin. The bias corrected soil moisture data for the ungauged basin was used for evaluation of the model simulation, reducing predictive uncertainty and parameter estimation. 

29 

# **CHAPTER 05** 

# **RESULTS AND DISCUSSION** 

### **5.1 CALIBRATION OF GR4J HYDROLOGICAL MODEL** 

The GR4J hydrological model was setup for all the 12 considered basins using precipitation and potential evapotranspiration as inputs. The GR4J models for the all the 12 basins were calibrated using the observed streamflow at watershed outlet. It is to note that the pseudo ungauged basin Sugar Creel EdinBurgh watershed (03362500) considered in this study was also calibrated to compare the performance of the proposed regionalization framework with the traditionally calibrated model. All the models were calibrated using optimization algorithm with maximising Nash Sutcliffe efficiency (NSE) as the objective function. 

The input and streamflow data for the 12 selected MOPEX catchments was available from 1948 to 2001. The GR4J model was setup for this period and calibrated from 1952 to 1991. The remaining period of data (1992-2001) was used for validating the model. The model parameters, along with their performance in terms of NSE in both calibration and validation period is shown in Table _5_ . _1_ . The GR4J model performed well in all the basins with >0.75 NSE during calibration period and >0.67 NSE during the validation period, indicating the suitability of the model for this analysis. The performance of the ungauged basin 03362500 was observed to be 0.76 and 0.77 during calibration and validation periods respectively. Further, the best performing parameters in all the basins were found to be in similar ranges, with the exception of CNX2 parameter, indicating the homogenous characteristics of the 12 selected basins. 

During calibration, the model seperates each day as wet and dry day (as discussed in model description) and the number of wet days in all the 12 catchments are similar which influences the parameters of the model. From the calibration analysis, it was found that in total number of rainfall events during the calibration period, less than 50% of the days were only wet days for all the basins. Thus, more than 50% of the days the precipitation is converted into AET. This can be observed in the maximum capacity (X1) of  production store which depends upon the part of net rainfall where its value is less than the median range in all the bains. The first stage of the routing phase, linear routing has the time base similar for all the basins indicating the time lag between the ranifall event and the resulting streamflow is more than 2 days in all the basins. The routing capcity (X3) for all the basins were below the median value of its range indicating that level of routing store does not exceeds its maximum capacity since the rainfall 

30 

events causing flow is less for all basins. This is justified by the exchange coefficient (X2), which is posititve for all the basins. The positive value of X2 infers that the water is imported into the routing store and no water is exported from the store. The water is exported only when the level of the routing store equals or exceeds the maximum capacity of the routing store. The value of the snow pack thermal state coefficient (CNX1) is similar for all the basins and less since the model considers single elevation extrapolated in this study which is responsible for the snow melt. The degree day melt coefficient (CNX2) capacity is not uniform for all the basins which is a function of temperature. 

Table 5.1:Parameters estimated from hydrological model for all 12 basins 

|**S.**<br>|**Station**|||**Param**<br>|**eters**<br>|||**Effici**<br>|**ency**<br>|
|---|---|---|---|---|---|---|---|---|---|
|**No.**||**X1**|**X2**|**X3**|**X4**|**CN1**|**CN2**|**Calibration**<br>**NSE**|**Validation**<br>**NSE**|
|1|03281500|170.72|0.10|20.09|2.25|0.01|30.93|0.80|0.80|
|2|03301500|223.63|0.05|15.18|3.45|0.03|9.04|0.85|0.80|
|3|03303000|134.29|1.76|20.70|2.15|0.01|3.10|0.76|0.68|
|4|03326500|206.44|0.31|15.49|2.40|0.01|8.35|0.76|0.67|
|5|03328500|278.66|1.08|23.57|2.33|0.00|9.04|0.76|0.75|
|6|03331500|370.12|1.77|87.45|3.24|0.06|11.13|0.78|0.84|
|7|03339500|257.24|0.61|26.05|1.66|0.01|6.90|0.76|0.81|
|8|03345500|303.76|0.58|45.31|3.28|0.06|5.78|0.75|0.76|
|9|03349000|278.66|0.26|30.57|2.50|0.01|8.60|0.82|0.79|
|10|03361500|282.22|0.34|27.82|2.28|0.01|15.91|0.81|0.83|
|11|03364000|270.43|0.52|43.38|2.69|0.04|13.35|0.82|0.86|
|12|03362500|232.76|0.27|25.79|2.38|0.04|8.43|0.76|0.77|



### **5.2 DERIVATION OF PARAMETERS PDF & BEST FIT DISTRIBUTION** 

The DREAM algorithm was used to derive the posterior probability density functions of the parameters, considering uniform distribution as the prior PDF in the entire range of the GR4J model parameters. The DREAM algorithm requires user to input the initial values of the parameters, and the calibrated parameter values were provided as the initial values. DREAM algorithm runs in an iterative procedure (3000 iterations in this study), and in the first step parameters are sampled from the entire range using Latin Hypercube Sampling technique. In this study, 15000 samples were generated for each of the parameter. The global optimization in DREAM algorithm maximizes the loglikelihood function running in five parallel chains. Gelman Rubin criteria is adopted for convergence of the parameter ranges, where every tenth sample drawn is considered for the behavioural set. Once the parameters are converged at the end of total iterations, the posterior distribution of the parameter sets is estimated using the last 10% samples of the 3000 iterations. It was observed, in all the basins, that the convergence of the parameters was good with less iterations for all the parameters. 

31 

Table 5.2: Best fit Distribution of X1, X2, X3, X4 and its parameters for all basins 

|**Station**|**Nor**<br>**distrib**|**mal**<br>**ution**|**Lognor**<br>**distribu**|**mal**<br>**tion**|**Norm**<br>**distrib**|**al**<br>**ution**|**Norm**<br>**distribu**|**al**<br>**tion**|**Wei**<br>**distrib**|**bull**<br>**ution**|**Logno**<br>**Distri**|**rmal**<br>**bution**|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
||**X1**<br>**mean**|**X1 SD**|**X2 mean**|**X2 SD**|**X3 mean**|**X3 SD**|**X4 mean**|**X4 SD**|**CNX1**<br>**shape**|**CNX1**<br>**scale**|**CNX2**<br>**mean**|**CNX2**<br>**SD**|
|**03281500**|176.66|5.94|-3.25|0.82|21.44|0.98|2.24|0.01|1.53|0.03|3.27|0.13|
|**03301500**|233.76|6.33|-2.41|0.32|14.36|0.80|3.45|0.01|1.82|0.10|2.58|0.09|
|**03303000**|140.59|5.03|0.57|0.04|20.26|1.05|2.15|0.01|1.10|0.07|1.17|0.09|
|**03326500**|203.86|4.87|-1.23|0.07|13.84|0.41|2.40|0.01|1.96|0.28|2.20|0.05|
|**03328500**|281.40|5.58|0.07|0.03|21.76|0.75|2.34|0.01|1.08|0.03|2.21|0.03|
|**03331500**|375.95|7.47|0.59|0.03|89.43|2.61|3.25|0.04|1.48|0.04|2.46|0.03|
|**03339500**|248.82|5.63|-0.56|0.05|26.56|0.79|1.64|0.03|1.45|0.06|1.96|0.03|
|**03345500**|298.33|43.56|-0.52|0.06|50.84|7.10|3.05|0.24|6.05|0.41|1.89|0.10|
|**03349000**|281.35|6.02|-1.32|0.11|28.21|0.74|2.49|0.02|1.41|0.05|2.18|0.03|
|**03361500**|280.31|4.76|-1.20|0.07|29.17|0.99|2.25|0.01|1.18|0.03|2.76|0.03|
|**03364000**|265.98|6.15|-0.68|0.06|44.01|1.09|2.65|0.02|1.77|0.04|2.60|0.02|
|**03362500**|229.25|4.10|-1.44|0.13|26.76|1.05|2.36|0.01|1.40|0.03|2.23|0.11|



32 

The derived posterior density of all the parameters from the DREAM algorithm were fitted with statistical distributions to identify the best fit distribution in all the basins. The best fit distribution for each of the parameter was identified using Kolmogorov-Smirnov Test (KS test) and Akaike information criterion (AIC). The distribution with the least AIC value is selected as the best fitting distribution. The parameters of the statistical distributions (such as location, scale and shape) were identified using goodness of fit criterion, a KS value of <0.04 confirms the fit of the distribution. In this study, general normal distribution was identified as the best fit distribution for the parameters X1, X3, and X4. The Parameters X2 and CNX2 exhibited lognormal distribution in all the basins, while the Weibull distribution was the best fit for the parameter CNX1. It is to note that the best fit distribution for each of the parameter was selected based on its performance in all the basins. The distribution that performed best in most of the basins was identified as the best fit distribution for all the basins. The parameters of the distributions, i.e. location (mean) and shape (standard deviation) of normal and lognormal distribution, and shape and scale parameters of the Weibull distribution were estimated for the parameters in all the basins, which is tabulated in Table _5_ . _2_ . Similar to the calibrated parameters, the parameters of the distributions, identified from the analysis, were found to be in similar ranges. These estimated parameters for each of the basins was used as dependent variables in the regression-based regionalization technique. 

### **5.3 REGRESSION BASED REGIONALIZATION FRAMEWORK** 

The regression-based regionalization framework develops a relationship between catchment attributes (13 attributes are considered in this study) as explanatory variables and the location, shape and scale parameters of all PDF of the hydrological parameters as the response variables. The 14 catchment attributes considered in this study are grouped into physiographic, climatic, soil information, land use information and morphometric attributes. Multi-linear regression models were developed for each of the parameters separately. During the model development, it was observed that all the catchment attributes do not contribute in explaining the variance in the response variables. Consequently, the best combination of the explanatory variables was identified using correlation matrix. The catchment attributes having high multi-collinearity were eliminated and only the variables that best predicted the response variables were retained. The identified catchment attributes that explain the variance of the response variables of each of the parameters are shown in Table _5_ . _3_ . A MLR model was developed for each of the parameter for the 11 gauged basins using the selected catchment attributes to estimate the response variables using least square error and variance minimization technique. The performance for each of the model was evaluated using the coefficient of determination (R<sup>2</sup> ) as shown in Table _5_ . _3_ . The R<sup>2</sup> values for each of the models ranged from 0.54 to 0.85, with 

33 

majority of the models have R<sup>2</sup> >0.60, indicating the good fit of the models. The developed MLR model was used to identify the location, shape and scale parameters of the statistical distribution of the hydrological model parameters in the ungauged basin Sugar creek watershed (03362500). These values are compared with the ones obtained from the DREAM algorithm. As it is evident from Table _5_ . _3_ , the values of the statistical distribution were found to be similar for all parameters except CNX1 in the Sugar creek watershed ungauged basin. The close match of the statistical parameters of the PDF obtained from MLR and DREAM algorithm suggests that the developed MLR is effective in estimating the hydrological model parameters using catchment attributes. 

Table 5.3: Parameters of statistical distribution from MLR Output 

|**Model**|**PDF of**||**0336**<br>|**2500**<br>|**R**<sup>**2**</sup><br>|
|---|---|---|---|---|---|
|**Parameters**|**Parameters**|**Catchment Attributes**|**PDFs**<br>**Output**|**MLR**<br>**Output**|**MLR**<br>**Model**|
|X1|Mean|Area + Elevation +<br>Precipitation + Temperature +<br>|229.25|233.65|0.65|
||SD|AI + Clay + Forest +<br>Cultivated + SF|4.10|29.78|0.66|
|X2|Log Mean|Elevation + Precipitation + AI<br>|-1.44|-1.23|0.71|
||Log SD|+ Forest + Cultivated + SF|0.13|0.22|0.79|
|X3|Mean|Area + Precipitation +<br>Temperature + Slope + Silt +|26.76|23.9|0.82|
||SD|<br>Clay + Forest + SF|1.05|7.12|0.85|
|X4|Mean|Area + Elevation +<br>Precipitation + AI +<br>|2.36|2.52|0.81|
||SD|Temperature + Silt + Clay +<br>Builtup + SF|0.01|0.21|0.54|
|CNX|Shape|Area + Precipitation +<br>Tt + AI + Sl +|1.40|2.15|0.77|
|1|Scale|emperaure    ope<br>Silt + Forest + Cultivated + SF|0.03|0.02|0.81|
|CNX2|Log Mean|Area + Elevation +<br>Precipitation +<br>|2.23|2.5|0.73|
||Log SD|Temperature + Clay + Sand +<br>Silt + SF|0.11|0.01|0.61|



Using the PDF of the parameters and the location, scale and shape parameters obtained from the MLR for the pseudo ungauged basin, 10000 parameter sets were sampled using LHS. The probability density of the sampled parameters is shown in Figure _5_ . _1_ . Markov Chain Monte Carlo simulations were performed by forcing the sampled parameter sets in the GR4J model to generate ensemble of streamflow simulations. 

34 



<!-- Start of picture text -->
> > > &<br>i}3 7.c 2 an)is<br>5S ow o o<br>a 8 a+ ch) ty<br>> 2 > > oO<br>ao Bonoo a[x<br>8a98o2a°2a 2 o<br>150 200 250 300 350 02 03 04 05 06 07 10 20 30 40<br>x1 X2 X3<br>o o wo<br>So<br>a Sw. a N<br>> 2 > ><br>ae £2 o |<br>3 ao§& a3<br>aa a<br>:Po JX :Se ey [ i:Pio JN<br>ce a5 a x<br>2.0 25 3.0 0.00 0.01 0.02 0.03 0.04 11.6 12.0 12.4 12.8<br>X4 CNX1 CNX2<br><!-- End of picture text -->



<!-- Start of picture text -->
wo<br>— 7)<br>= ———_ Observed<br>= re Ensembles<br>c=<br>Ss<br>=<br>oO<br>@®<br>=] w<br>a<br>Lan|<br>Oo = oO i] <> cS Lo] Oo cS i] oOo a | a<br>oO Len] oO oO Len] oO Oo oO oO fen] oO oO<br>oo oO 12>) N wD co =— ww rt co oo <a)<br>— = _- GN N N oO foe] oO<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->



<!-- Start of picture text -->
cs 2 ——_ Observed<br>OD= Ensembles<br>= g<br>2: st<br>a|<br>2 6<br>oOo—E A<br>=<br>”<br>am |<br>oO oO oO oO =) oO | a oO = | oO Oo Oo Oo<br>oO oO > oO oO oO oO oO < Oo oO oO<br>oo oO Oo N wm oO =— wr os oO co oO<br>—_— =— _- N N N oO oO oO<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->

catchments (Table _5_ . _4_ (a) and Table _5_ . _4_ (b)). The statistical parameters obtained from the MLR models for the pseudo ungauged catchments were similar to the values derived from DREAM algorithm using observed streamflow. The close match of the parameters of the PDF’s of the hydrological model parameters show the effectiveness of the regression based regionalization framework. 

Similar to the aforementioned analysis, 10000 parameters sets were sampled using LHS from the PDF’s obtained from the MLR models of the remaining 11 ungauged catchments. Markov Chain Monte Carlo simulations were performed using the sampled parameter sets. The output of the GR4J model in terms of streamflow and soil moisture was compared with the observed streamflow and soil moisture of GLDAS for the respective basins. The range of the NSE for ensemble simulations of the streamflow for each of the basin is shown in Table 5.5. From the table, it is evident that the maximum NSE for all catchments is above 0.60. The mean of the ensemble of the streamflow was compared to the observed streamflow by computing the NSE as shown in Table 5.5. The NSE values for the ensemble mean was observed to be >0.70 in most of the basins, indicating good performance of the hydrological model in the pseudo ungauged catchments. The percentage of coverage for all the basins was found to be >50%, with small average width. The high R<sup>2</sup> values for the MLR models and NSE values for the ensemble simulations in the LOOCV approach suggests that the regression-based regionalization framework is effective in prediction of the streamflow. 

### **5.4 ASSESSING THE PREDICTION UNCERTAINTY USING SATELLITE BASED SOIL MOISTURE DATA** 

The regression-based regionalization framework using MLR resulted in acceptable results with respect to the ensemble mean, however, the range of uncertainty in the ensemble streamflow and soil moisture simulation could be reduced. From the results discussed above, it is evident that the uncertainty in soil moisture simulation is significantly high. Since, soil moisture is the base for other hydrological variable computations, an improvement in its simulation could result in improvement in streamflow simulations as well. Further, the parameter ranges could be pruned using soil moisture data to reduce the parametric uncertainty. 

37 

Table 5.4(a): The probability distribution characteristics of model parameters on pseudo ungauged basin from LOOCV 

|Model|Distribution|03281|500|03301|500|033|03000|033265|00|03328|500|03331|500|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|Parameters|Parameters|Value|R<sup>2</sup>|Value|R<sup>2</sup>|Value|Value|Value|R<sup>2</sup>|Value|R<sup>2</sup>|Value|R<sup>2</sup>|
|X|Mean|190.45|0.8|218.43|0.62|189.41|336.38|336.38|0.88|271.12|0.62|271.12|0.62|
|1|SD|32.62|0.81|45.74|0.87|18.42|45.52|45.52|0.67|11.49|0.59|11.49|0.59|
|X|Log Mean|-1.11|0.71|-1.86|0.82|-1.46|-0.54|-0.54|0.72|-0.55|0.78|-0.55|0.78|
|2|Log SD|0.57|0.73|0.12|0.71|0.29|0.06|0.06|0.78|0.17|0.64|0.17|0.64|
|X|Mean|31.91|0.65|13.26|0.73|28.75|60.84|60.84|0.78|38.24|0.77|38.24|0.77|
|3|SD|15.47|0.71|9.18|0.66|7.72|13.46|13.46|0.65|5.04|0.50|5.04|0.50|
|X|Mean|2.77|0.46|2.99|0.84|2.56|3.31|3.31|0.77|3.22|0.82|3.22|0.82|
|4|SD|0.2|0.88|1.13|0.7|0.17|0.27|0.27|0.81|0.02|0.81|0.02|0.81|
|CNX|Shape|0.74|0.61|1.67|0.62|0.97|1.35|1.35|0.6|1.02|0.41|1.02|0.41|
|1|Scale|0.04|0.57|0.02|0.63|0.11|0.11|0.11|0.42|0.01|0.46|0.01|0.46|
|CNX|Log Mean|2.95|0.81|2.12|0.81|1.8|03331500|03331500|0.83|2.13|0.87|2.13|0.87|
|2|Log SD|0.02|0.72|0.03|0.69|0.21|Value|Value|0.85|0.03|0.84|0.03|0.84|



Table 5.4(b): The probability distribution characteristics of model parameters on pseudo ungauged basin from LOOCV 

|Model<br>|Distribution<br>|03339<br>|500<br>|033455<br>|000<br>|03349<br>|000<br>|03361<br>|500<br>|03364<br>|000<br>|
|---|---|---|---|---|---|---|---|---|---|---|---|
|Parameters|Parameters|Value|R<sup>2</sup>|Value|R<sup>2</sup>|Value|R<sup>2</sup>|Value|R<sup>2</sup>|Value|R<sup>2</sup>|
|X|Mean|253.45|0.47|309.29|0.75|273.13|0.63|294.5|0.74|282.01|0.44|
|1|SD|45.29|0.7|49.75|0.65|25.79|0.75|20.89|0.73|29.19|0.54|
|X|Log Mean|-0.66|0.57|-0.54|0.77|-1.24|0.84|-1.3|0.61|-0.51|0.72|
|2|Log SD|0.03|0.51|0.24|0.62|0.07|0.88|0.13|0.75|0.01|0.78|
|X|Mean|24.99|0.43|46.98|0.68|31.76|0.75|29.3|0.8|36.78|0.82|
|3|SD|13.7|0.8|18.3|0.77|6.91|0.64|6.09|0.56|10.38|0.52|
|X|Mean|2.24|0.54|2.92|0.81|2.71|0.79|2.19|0.43|2.32|0.64|
|4|SD|0.08|0.46|0.08|0.8|0.12|0.72|0.05|0.57|0.27|0.84|
|CNX|Shape|1.83|0.84|1.58|0.49|1.29|0.65|1.24|0.58|1.83|0.55|
|1|Scale|0.22|0.79|0.09|0.43|0.07|0.59|0.07|0.52|0.07|0.78|
|CNX|Log Mean|2.35|0.83|2.01|0.88|1.69|0.64|2.37|0.81|2.75|0.79|
|2|Log SD|0.09|0.85|0.07|0.79|0.02|0.54|0|0.56|0.06|0.74|



38 

The ensemble simulations resulting from the parameter sets derived from the MLR models resulted in an NSE range of -3.77 to 0.33 for the soil moisture for the Sugar creek watershed basin. From the ensemble simulations, the simulations corresponding to NSE values of >0.10 were selected to reduce the parameter ranges and prediction uncertainty band. A total of 5392 parameter sets from the 10000 sets met the criteria of NSE >0.10. The ensemble simulations resulting from the sub-sample space resulted in an NSE range of 0.41 to 0.78 for streamflow simulations and 0.10 to 0.33 for the soil moisture simulations. The mean of the ensemble simulations resulted in NSE of 0.77 for streamflow simulation and 0.31 for the soil moisture simulations. 

The average width of the ensemble streamflow simulations for the sub sample was found to be 1.02 mm/day, while the average width for soil moisture was found to be 37.29 mm/day. The percentage of coverage for the streamflow and soil moisture for reduced sub sample was found to be 48.33% and 46.5% respectively. 

Similar analysis was carried out for the remaining basins as in the LOOCV approach. The simulations of the ensemble corresponding to NSE>0.1 in soil moisture simulations were selected as the sub-sample. The NSE for the ensemble simulations corresponding to the subsampled parameter space for the all the basins are shown in Table _5_ . _6_ . The range of the NSE values for the reduced ensemble simulations have similar higher values, while the lower limit of the range increased. This reduction in the range could be attributed to the selection of better soil moisture simulations. Further, mean of the ensemble simulations had similar NSE as the entire range and it was also observed that NSE value was close to the maximum value of the range in all the basins. The mean of the ensemble simulations for the sub-sample was observed to be >0.50 in all basins. The reduction in the ensemble simulations also resulted in significant reduction in average width in both streamflow and soil moisture simulations in most basins. The percentage coverage for soil moisture simulations also had significant reductions, but the reduction of percentage coverage in streamflow simulations was found to be marginal. 

The change in the ranges of the parameters derived from the MLR and the sub sample derived from the ensemble, corresponding to the soil moisture simulations of NSE>0.10, was analysed. It was observed that the parameter ranges of all the parameters of the GR4J model reduced. However, the reduction for the range of X1 was found to be significant as it reduced from 120347 to 229-300 for the Sugar creek watershed. Similar reduction was also observed in other basins for the X1 parameter (Table _5_ . _7_ ). Further, in some basins the range of the parameter X3 also showed slight reduction. No change was observed in other parameters, indicating that the parameters X1 and X3 were most identifiable. 

39 

Table 5.5: Minimum and maximum NSE from LOOCV analysis. 

|**USGS**<br>**ID**|**NSE Range**<br>**Streamflow**|**NSE**<br>**Ensemble**<br>**mean**<br>**Streamflow**|**Average**<br>**Width**<br>**streamflow**<br>**(mm/day)**|**Percentage of**<br>**coverage**<br>**streamflow**<br>**(%)**|**NSE range**<br>**soil moisture**|**NSE**<br>**Ensemble soil**<br>**moisture**|**Average**<br>**Width soil**<br>**moisture**<br>**(mm/day)**|**Percentage of**<br>**coverage soil**<br>**moisture**<br>**(%)**|
|---|---|---|---|---|---|---|---|---|
|03281500|0.01 - 0.62|0.70|3.67|52.40|(-7.36) – 0.24|0.21|154.16|95.35|
|03301500|0.29 - 0.62|0.77|5.10|37.20|(-12.9) – 0.26|0.17|211.61|93.92|
|03303000|0.36 - 0.62|0.51|1.53|55.50|(-2.2) – 0.23|0.22|77.61|76.49|
|03326500|0.07 - 0.63|0.60|1.54|50.55|(-11.46) – 0.15|0.15|172.27|97.73|
|03328500|0.46 - 0.67|0.55|0.43|57.88|(-0.16) – 0.33|0.32|45.94|52.64|
|03331500|0.51 – 0.76|0.74|0.50|56.47|(-11.96) – 0.21|0.19|168.54|96.99|
|03339500|0.13 - 0.80|0.77|1.76|41.15|(-10.76) – 0.19|0.18|180.01|97.81|
|03345500|(-0.64) - 0.77|0.75|2.13|41.00|(-9.88) – 0.29|0.24|189.79|96.96|
|03349000|0.62 - 0.81|0.79|0.65|57.36|(-2.62) – 0.31|0.30|100.90|89.30|
|03361500|0.52 - 0.84|0.84|0.74|57.76|(-3.14) – 0.32|0.32|84.20|78.10|
|03364000|(-0.35) - 0.86|0.82|1.78|55.78|(-3.97) – 0.30|0.27|125.93|93.73|



40 



<!-- Start of picture text -->
wr<br>pees ao<br>= —— _ Observed<br>= 2 Ensembles<br>=<br>a<br>3 Oo<br>Fo<br>® =—<br>a<br>Oo<br>oOo oOo ao lo] oOo Lam] a Oo oOo Qa Qo oOo lo]<br>Oo ao oa oO ao oa oOo oOo Oo Oo ao oOo<br>co oO te>) N its) co = a rm ao co oO<br>— — _ NN NN GN oO cap] oo<br>Days (ist January 1992 to 31st December 2001)<br><!-- End of picture text -->



<!-- Start of picture text -->
can)<br>=os —— Observed<br>2]- 8 Ensembles<br>= oO<br>o2<br>D>& :<br>Oo a '<br>e 2 \<br>S<br>Oo<br>° °o co) fa) ° ca) ra) ro) ° ° ° ra) °<br>ra) ran) 5 ral ran) ra) o o ra) ran) ran) ran)<br>ro) o a ro Ts) iva) = T ~ 3a o ©<br>-_- _- _- —N N N oO oO 9<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->

Table 5.6: Minimum and maximum NSE from LOOCV analysis for reduced parameter space 

|**USGS**<br>**ID**|**NSE Range**<br>**Streamflow**|**NSE**<br>**Ensemble**<br>**mean**<br>**Streamflow**|**Average**<br>**Width**<br>**streamflow**<br>**(mm/day)**|**Percentage of**<br>**coverage**<br>**streamflow**<br>**(%)**|**NSE range**<br>**soil moisture**|**NSE**<br>**Ensemble soil**<br>**moisture**|**Average**<br>**Width soil**<br>**moisture**<br>**(mm/day)**|**Percentage of**<br>**coverage soil**<br>**moisture**<br>**(%)**|
|---|---|---|---|---|---|---|---|---|
|03281500|0.2 – 0.6|0.59|2.93|45.29|0.11 – 0.24|0.21|23.98|26.98|
|03301500|0.31 - 0.59|0.57|5.00|35.82|0.15 – 0.26|0.20|23.33|28.50|
|03303000|0.39 - 0.62|0.62|1.08|49.29|0.13 – 0.23|0.18|25.17|33.98|
|03326500|0.23 - 0.62|0.60|1.11|45.02|0.10 – 0.15|0.13|19.11|26.42|
|03328500|0.48 - 0.62|0.55|0.43|55.85|0.19 – 0.33|0.33|21.55|42.78|
|03331500|0.51 – 0.75|0.74|0.41|49.84|0.13 – 0.21|0.23|20.69|25.87|
|03339500|0.19 - 0.77|0.77|1.09|40.53|0.10 – 0.19|0.11|18.38|21.99|
|03345500|0.1 - 0.62|0.6|1.95|39.48|0.15 – 0.29|0.24|22.50|24.58|
|03349000|0.62 - 0.79|0.79|0.53|47.33|0.10 – 0.31|0.11|25.97|39.46|
|03361500|0.61 - 0.83|0.79|0.58|47.69|0.12 – 0.32|0.20|27.30|41.88|
|03364000|0.01 - 0.6|0.62|1.69|47.57|0.15 – 0.30|0.19|23.34|45.73|



42 

Table 5.7: Parameter Ranges from regionalization and analysis with Soil moisture 

|USGS ID|Range|X|1|X|2|X|3||X4|CN|X1|CN|X2|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|||Min.|Max.|Min.|Max.|Min.|Max.|Min.|Max.|Min.|Max.|Min.|Max.|
|03281500|Regionalization|68.59|324.05|0.03|2.99|2.09|90.25|1.96|3.68|0.00|0.74|18.03|20.27|
||Soil moisture Analysis|182.62|251.87|0.04|2.99|25.75|90.25|2.06|3.68|0.00|0.74|18.03|20.19|
|03301500|Regionalization|43.29|423.62|0.10|0.25|24.09|48.20|1.60|7.21|0.00|0.08|7.50|9.20|
||Soil moisture Analysis|165.24|333.24|0.10|0.25|28.11|48.20|1.64|7.21|0.00|0.08|7.51|9.20|
||Regionalization|114.81|258.31|0.08|0.68|1.38|58.83|1.94|3.23|0.00|1.10|2.68|16.26|
|03303000|Soil moisture Analysis|157.81|181.80|0.09|0.65|6.72|56.65|2.00|3.11|0.00|1.03|3.04|12.60|
|03326500|Regionalization|70.82|414.70|0.25|0.65|12.23|50.54|1.55|1.72|0.00|0.20|7.82|10.54|
||Soil moisture Analysis|258.65|310.18|0.27|0.61|16.74|47.76|1.58|1.72|0.00|0.20|8.09|10.37|
|03328500|Regionalization|224.38|317.36|0.29|1.16|17.20|57.52|3.15|3.29|0.00|0.13|7.54|9.29|
||Soil moisture Analysis|248.49|292.05|0.29|1.16|17.20|57.52|3.15|3.29|0.00|0.13|7.61|9.29|
||Regionalization|165.78|507.03|0.47|0.76|8.28|114.44|2.28|4.30|0.00|0.62|7.15|14.85|
|03331500|Soil moisture Analysis|254.61|330.34|0.47|0.76|8.28|110.37|2.47|4.29|0.00|0.49|7.55|14.85|
|5|Regionalization|68.67|433.64|0.46|0.59|25.66|84.17|1.93|2.55|0.00|0.75|5.60|9.82|
|0333900|Soil moisture Analysis|264.70|295.99|0.47|0.57|34.98|69.92|1.97|2.54|0.00|0.63|5.82|9.82|
||Regionalization|121.98|521.11|0.22|1.47|28.21|125.30|2.59|3.28|0.00|0.37|5.08|5.76|
|03345500|Soil moisture Analysis|246.11|345.01|0.22|1.42|29.48|125.30|2.59|3.20|0.00|0.34|5.08|5.76|
|03349000|Regionalization|167.98|370.62|0.22|0.39|3.66|60.74|2.25|3.22|0.00|0.40|10.65|10.79|
||Soil moisture Analysis|260.35|288.75|0.22|0.37|3.66|60.74|2.28|3.13|0.00|0.32|10.66|10.79|
||Regionalization|214.04|376.45|0.17|0.45|3.94|53.09|2.01|2.37|0.00|0.42|12.41|19.47|
|03361500|Soil moisture Analysis|237.04|287.73|0.17|0.41|7.39|49.22|2.01|2.35|0.00|0.42|12.41|18.85|
||Regionalization|119.96|355.81|0.12|0.70|2.59|53.91|1.62|3.32|0.00|0.05|11.64|12.81|
|03362500|Soil moisture Analysis|229.79|300.40|0.14|0.65|3.94|43.11|1.74|3.25|0.00|0.04|11.61|12.69|
|03364000|Regionalization|168.83|393.33|0.58|0.62|3.09|82.32|1.30|3.40|0.00|0.26|12.64|14.75|
||Soil moisture Analysis|242.89|287.58|0.58|0.62|3.10|74.13|1.30|3.30|0.00|0.26|12.86|14.75|



43 



<!-- Start of picture text -->
w<br>oO<br>= ——— Observed<br>: 2 ------- Simulated<br>£<br>5 2<br>oO<br>®<br>5° i ddd , , |<br>|< q hie h tL<br>Oo oO oO oO oO = oO Oo Oo oO oO Oo oO<br>oO oO oO oO Lo) oO oO oO oO Oo oO oO<br>oO oO oa N w co — wT Lied i] © oOo<br>= o- _- N N N oO oO oo<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->



<!-- Start of picture text -->
=<br>ao S=F : i ums § 4 iff Wh ik\ ! i4<br>= ~ oh H y, * ‘ i) Ag f ‘ i nv q iP if si Pak) i<br>E VAR OO oA i<br>ee Ray ah, wh, Hip BY ty h re eT iy<br>a 2 ¥ i i (ay «! an?<br>— my \ iv ;<br>So i Af!<br>=3 3O ——— Observed : \<br>3 ------ Simulated<br>a Oo<br>Oo Qo Oo Oo Oo Oo oa Oo L= ao So Qo Oo<br>oS a < _ ee | —s a | = Oo a) Oo oe<br>oo oO fe) N wm co i wr eed oO oO oO<br>= = ad N N N = oO cop]<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->

The simulation of the streamflow for the soil moisture calibrated models for all the 12 basins was compared with the observed streamflow. The NSE values for the streamflow simulations in both calibration and validation periods are reported in Table _5_ . _9_ . The NSE values for the streamflow simulations ranged from 0.31 to 0.66 for the calibration period and 0.35 to 0.56 during the validation period. Figure _5_ . _6_ and Figure _5_ . _7_ shows the hydrograph of the streamflow simulation and soil moisture prediction respectively. While all the hydrological model calibrated using soil moisture were found to have acceptable performance for the streamflow simulations, the performance did not match the models calibrated using streamflow simulations. 

In the second approach, the parameter ranges were pruned from the original ranges using the MLR output from the regionalization approach. The reduced ranges from the parameter were given as input to the optimizer. The performance of the model in term of NSE for the soil moisture simulation was observed to be similar as that of scenario 1 in both calibration and validation periods. The calibrated parameters are shown in the Table _5_ . _10_ . 

The NSE values of soil moisture prediction for different basins ranged from 0.1 to 0.28 during calibration period and 0.1-0.33 during validation period. However, a significant difference was observed in the simulation of the streamflow in the basins. The NSE for the streamflow simulations was found to be >0.62 for all basins in the calibration period and >0.50 in validation period. The streamflow simulation of the models calibrated using the soil moisture with pruned parameter ranges from the regionalization approach was similar to the ones with the model calibrated using streamflow shown in Table _5_ . _11_ . The good performance of the model in all the basins, indicates that the pruning of the ranges using MLR helped in improving the performance of the model in the ungauged basins. Figure _5_ . _8_ Figure _5_ . _6_ and Figure _5_ . _9_ shows the hydrograph of the streamflow simulation and soil moisture prediction respectively for this scenario. The best parameter sets obtained from the two calibration scenarios show that the parameters X2 and X3 have significant variability in both the scenarios. A huge variation was observed in the X3 parameter in all the basins for the two calibration scenarios. The optimal value of X3 was found to be lower for all basins in scenario 2 as compared to the scenario 1. 

45 

Table 5.9: Parameters of model for ungauged basin using soil moisture as simulating variable in the entire ranges of the parameters of the model. 

|**USGS ID**|**X1**|**X2**|**X3**|**X4**|**CNX1**|**CNX2**|**Calibra**<br>**NSE**<br>**Streamflow**|**tion**<br>**NSE**<br>**Soil**<br>**moisture**|**Valid**<br>**NSE**<br>**Streamflow**|**ation**<br>**NSE**<br>**Soil**<br>**moisture**|
|---|---|---|---|---|---|---|---|---|---|---|
|03281500|227.93|4.33|280.53|1.38|1.00|10.00|0.40|0.10|0.35|0.14|
|03301500|242.57|2.34|151.34|2.33|0.06|7.00|0.66|0.12|0.49|0.10|
|03303000|182.47|3.53|184.89|2.06|1.00|14.50|0.45|0.10|0.50|0.10|
|03326500|281.81|3.89|215.40|4.59|1.00|7.19|0.45|0.18|0.38|0.27|
|03328500|264.94|2.22|244.96|2.80|1.00|7.01|0.55|0.10|0.56|0.33|
|03331500|269.89|3.26|99.01|1.22|1.00|7.20|0.48|0.33|0.49|0.22|
|03339500|270.76|1.05|184.59|2.94|1.00|5.00|0.31|0.14|0.55|0.32|
|03345500|282.95|3.31|237.99|3.23|1.00|0.07|0.40|0.33|0.44|0.23|
|03349000|270.30|1.12|164.89|4.68|1.00|5.03|0.31|0.10|0.56|0.31|
|03361500|263.46|2.73|176.26|3.06|0.76|12.00|0.37|0.12|0.51|0.29|
|03364000|269.76|1.44|182.41|2.08|0.30|11.02|0.59|0.19|0.53|0.21|
|03362500|259.39|2.45|190.86|1.86|0.10|10.00|0.51|0.28|0.51|0.33|



46 



<!-- Start of picture text -->
wD<br>co<br>= ——— Observed<br>=o 1 ae Simulated;<br>=<br>z 0 |<br>= ; : |<br>oO 1 1 1}<br>ro) | F | i<br>& wo i 1 \ dhs<br>wm ’ ae b 1 Hi ‘ Hy 5 '<br>Oo i<br>oO = oO oO = Oo a oO Oo oO Oo cz oO<br>Oo oO Oo Oo Oo Oo Oo oO Oo oO Oo<br>co oO oO N Ww oc =< wt Lied Oo oo oO<br>_ _ _ NS GN N oO oO oO<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->



<!-- Start of picture text -->
—<br>oO Qo 4, \<br>== oaom ved ‘ ts, odVe‘ BaD j iF {} Ki\ nad; %iy oh ‘ Ki<br>t '<br>—= ‘ \i , NL wae, i BGfh ia \ s yo’ MS be4 ka,<br>2 8 }woy: ifaw H %Vow‘ H ’ :YW 4)4 i. ! 4<br>= 8 — Observed<br>3 ------ Simulated<br>wo ><br>oOo Lon] oOo Qo —s oO on] —2 Lan] an] ao on] on]<br>oO <>? <3 a oOo Oo oOo oa oOo > cy oa<br>oo oO Le>} N wm co o, as | id io ] foe] oO<br>= _ ~ aa GN GN NS o oo cae]<br>Days (1st January 1992 to 31st December 2001)<br><!-- End of picture text -->

Table 5.11: Parameters of model for ungauged basin using soil moisture as simulating variable in the reduced space of parameter of the model. 

|**USGS ID**|**X1**|**X2**|**X3**|**X4**|**CNX1**|**CNX2**|**Calib**<br>**NSE**<br>**Streamflow**|**ration**<br>**NSE Soil**<br>**moisture**|**Valid**<br>**NSE**<br>**Streamflow**|**ation**<br>**NSE Soil**<br>**moisture**|
|---|---|---|---|---|---|---|---|---|---|---|
|03281500|227.27|1.41|47.46|2.37|0.70|22.00|0.67|0.10|0.64|0.15|
|03301500|238.71|0.04|31.32|2.33|0.06|7.00|0.71|0.11|0.69|0.10|
|03303000|164.64|0.35|34.64|2.06|1.00|14.50|0.65|0.14|0.50|0.10|
|03326500|277.19|0.63|21.27|1.81|0.20|7.00|0.68|0.10|0.62|0.14|
|03328500|259.48|0.51|20.20|3.34|0.10|7.00|0.65|0.10|0.61|0.30|
|03331500|264.95|0.47|78.79|3.37|0.60|7.00|0.64|0.16|0.69|0.27|
|03339500|268.41|0.52|36.91|1.80|0.80|5.00|0.63|0.12|0.73|0.10|
|03345500|281.56|0.37|92.02|3.05|0.40|5.00|0.71|0.09|0.69|0.10|
|03349000|266.43|0.28|55.68|2.79|0.30|10.00|0.76|0.10|0.68|0.13|
|03361500|255.03|0.26|26.26|2.05|0.40|12.00|0.73|0.12|0.77|0.21|
|03364000|259.71|0.56|58.82|2.08|0.30|12.00|0.75|0.11|0.80|0.22|
|03362500|259.37|0.45|25.07|2.06|0.10|11.00|0.70|0.28|0.72|0.33|



48 

# **CHAPTER 06** 

# **SUMMARY & CONCLUSIONS** 

### **6.1 SUMMARY** 

The GR4J model is setup for continuous streamflow simulation (1948 – 1991) in 12 study catchments, identified as homogenous by hydrological indices, to estimate the parameters of the model. The model is validated (1992 – 2001) to analyse the performance. A Bayesian approach (DREAM) using MCMC simulation is employed to derive the probability density function of the parameters. The derived parameters are best fitted to the statistical distribution and its PDFs are estimated. 

An MLR model is setup between the PDFs of parameters and catchment attributes estimated through consistent data sources. The parameters of the ungauged basin from MLR model are estimated and performance is evaluated using R<sup>2</sup> . The regionalization models are compared favourably using LOOCV approach, fitting MLR model, considering all the basins as ungauged basin. 

The predictive uncertainty of regionalization is quantified by generating ensembles of streamflow & soil moisture prediction using the parameters resulted from MLR model. The ensembles of soil moisture prediction are compared with the remote sensing soil moisture from GLDAS, and the parameter set of reduced space is selected. The reduced parameter is used to generate the ensembles of streamflow and soil moisture simulation. The performance of the simulation is compared based on the NSE ranges of all the simulations, maximum and average prediction of the ensembles. The quality of prediction is compared on the basis of average width and percentage coverage. 

The GLDAS soil moisture is used to simulate the hydrological model under two scenarios. The optimization of parameters is attained using Differential Evolution optimizer for the entire range of the parameter and reduced parameter space from regionalization. The performance of the proposed framework is analysed by comparing the ensembles of the simulations and soil moisture simulation with the results obtained from streamflow simulations of the GR4J model. 

### **6.2 CONCLUSIONS** 

The regionalization of GR4J model parameters, in this study, for continuous simulation in ungauged basin performed using regression-based approach. The hydrological model, setup in 12 basins have performed well with NSE>0.6 using streamflow simulation. The MLR model developed between the PDFs of the parameters, derived to address the uncertainty of the 

49 

hydrological model prediction and catchment attributes to estimate the parameters of the ungauged basin have good performance. The validation of the MLR model development performed using LOOCV approach have also yielded good performance in all the basins. The estimated parameters regionalised to ungauged basin have less uncertainty in streamflow prediction and more uncertainty in soil moisture prediction. The performance of the maximum of the prediction (0.78) and the average of the prediction (NSE of 0.77) are similar, masking the application of mean of the ensembles for hydrological application. The soil moisture prediction compared with the satellite soil moisture have resulted in acceptable reduction of the parameter space for the criteria NSE>0.1. The performance of the model prediction for the reduced parameter space is considerably good with reduced dispersion of NSE and average width in both streamflow and soil moisture prediction. 

The hydrological model simulation using the soil moisture carried out under two scenarios have performed well in both in calibration and validation period. However, the model prediction for the parameter range resulting from regionalization (scenario 2) have resulted good performance (NSE 0.73) marginally similar to the hydrological model simulation using streamflow (NSE 0.77). In this study, the evaluation of both regionalization framework and the soil moisture simulation is carried out using LOOCV approach. The performance of all the basin is similar indicating the confidence of the developed methodology. 

The outcome of the study was the calibration of hydrological model using remote sensing soil moisture product as simulating variable have improved performance the model prediction in the parameter range obtained from the regionalization framework in the ungauged basin. Thus, the integration of regionalization approach with simulation of hydrological model using remote sensing products in the ungauged basin is recommended to apply in the real time prediction. 

### **6.3 SCOPE FOR THE FUTURE STUDY** 

The performance of the proposed methodology in this study directs to, 

1. The development of regression-based regionalization using nonlinear approach including a greater number of catchments. 

2. Since, the hydrological model simulation of soil moisture has good performance, its application in distributed or semi-distributed model can be exercised in future. 

50 

# **REFERENCES** 

1. Andrew Gelman. Donald B. Rubin., 1992. Inference from iterative simulation using multiple sequences. Statist. Sci. 7, 457–472. 

2. Arora, M., Goel, N.K., Singh, P., Singh, R.D., 2005. Regional flow duration curve for a Himalayan River Chenab. Hydrology Research 36, 193–206. https://doi.org/10.2166/nh.2005.0014 

3. Athira, P., Sudheer, K.P., Cibin, R., Chaubey, I., 2016. Predictions in ungauged basins: an approach for regionalization of hydrological models considering the probability distribution of model parameters. Stochastic Environmental Research and Risk Assessment 30, 1131–1149. https://doi.org/10.1007/s00477-015-1190-6 

4. Aubert, D., Loumagne, C., Oudin, L., 2003. Sequential assimilation of soil moisture and streamflow data in a conceptual rainfall - Runoff model. Journal of Hydrology 280, 145– 161. https://doi.org/10.1016/S0022-1694(03)00229-4 

5. Bao, Z., Zhang, J., Liu, J., Fu, G., Wang, G., He, R., Yan, X., Jin, J., Liu, H., 2012. Comparison of regionalization approaches based on regression and similarity for predictions in ungauged catchments under multiple hydro-climatic conditions. Journal of Hydrology 466–467, 37–46. https://doi.org/10.1016/j.jhydrol.2012.07.048 

6. Bergstrom, S., 1991. Principles and Confidence in Hydrological Modelling. 

7. Besaw, L.E., Rizzo, D.M., Bierman, P.R., Hackett, W.R., 2010. Advances in ungauged streamflow prediction using artificial neural networks. Journal of Hydrology 386, 27–37. https://doi.org/10.1016/j.jhydrol.2010.02.037 

8. Beven, K.J., Kirkby, M.J., 1979. A physically based, variable contributing area model of basin hydrology. Hydrological Sciences Bulletin 24, 43–69. 

9. Bogning, S., Frappart, F., Blarel, F., Niño, F., Mahé, G., Bricquet, J.P., Seyler, F., Onguéné, R., Etamé, J., Paiz, M.C., Braun, J.J., 2018. Monitoring water levels and discharges using radar altimetry in an ungauged river basin: The case of the Ogooué. Remote Sensing 10. https://doi.org/10.3390/rs10020350 

10. Boughton, W., Chiew, F., 2007. Estimating runoff in ungauged catchments from rainfall, PET and the AWBM model. Environmental Modelling & Software 22, 476–487. https://doi.org/10.1016/j.envsoft.2006.01.009 

11. Bourgin, F., Andréassian, V., Perrin, C., Oudin, L., 2015. Transferring global uncertainty estimates from gauged to ungauged catchments. Hydrology and Earth System Sciences 19, 2535–2546. https://doi.org/10.5194/hess-19-2535-2015 

51 

12. Burnash, R.J.R.L.F. and R.A.M., 1973. A generalized streamflow simulation system: Conceptual modeling for digital computers. US Department of Commerce, National Weather Service, and State of California, Department of Water Resources. 

13. Castellarin, A., Galeati, G., Brandimarte, L., Montanari, A., Brath, A., 2004. Regional flow-duration curves: reliability for ungauged basins. Advances in Water Resources 27, 953–965. https://doi.org/10.1016/j.advwatres.2004.08.005 

14. Chouaib, W., Alila, Y., Caldwell, P. v., 2018. Parameter transferability within homogeneous regions and comparisons with predictions from a priori parameters in the eastern United States. Journal of Hydrology 560, 24–38. 

15. Dooge, 1957. The rational method for estimating flood peaks. Engineering 184, 311–313. 

16. Du, T.L.T., Lee, H., Bui, D.D., Arheimer, B., Li, H.Y., Olsson, J., Darby, S.E., Sheffield, J., Kim, D., Hwang, E., 2020. Streamflow prediction in “geopolitically ungauged” basins using satellite observations and regionalization at subcontinental scale. Journal of Hydrology 588. https://doi.org/10.1016/j.jhydrol.2020.125016 

17. Dubayah, R., Loechel, S., 1997. Modeling Topographic Solar Radiation Using GOES Data. 

18. Estacio, A.B.S., Costa, A.C., Souza Filho, F.A., Rocha, R.V., 2021. Uncertainty analysis in parameter regionalization for streamflow prediction in ungauged semi-arid catchments. Hydrological Sciences Journal 66, 1132–1150. 

19. Geetha, K., Mishra, S.K., Eldho, T.I., Rastogi, A.K., Pandey, R.P., 2007. Modifications to SCS-CN Method for Long-Term Hydrologic Simulation. Journal of Irrigation and Drainage Engineering 133, 475–486. 

20. Golian, S., Murphy, C., Meresa, H., 2021. Regionalization of hydrological models for flow estimation in ungauged catchments in Ireland. Journal of Hydrology: Regional Studies 36, 100859. https://doi.org/10.1016/j.ejrh.2021.100859 

21. He, M., Hogue, T.S., Franz, K.J., Margulis, S.A., Vrugt, J.A., 2011. Corruption of parameter behavior and regionalization by model and forcing data errors: A Bayesian example using the SNOW17 model. Water Resources Research 47. https://doi.org/10.1029/2010WR009753 

22. Hrachowitz, M., Savenije, H.H.G., Blöschl, G., McDonnell, J.J., Sivapalan, M., Pomeroy, J.W., Arheimer, B., Blume, T., Clark, M.P., Ehret, U., Fenicia, F., Freer, J.E., Gelfan, A., Gupta, H. v., Hughes, D.A., Hut, R.W., Montanari, A., Pande, S., Tetzlaff, D., Troch, P.A., Uhlenbrook, S., Wagener, T., Winsemius, H.C., Woods, R.A., Zehe, E., Cudennec, C., 2013. A decade of Predictions in Ungauged Basins (PUB)-a review. Hydrological Sciences Journal. https://doi.org/10.1080/02626667.2013.803183 

52 

23. Huang, Q., Long, D., Du, M., Han, Z., Han, P., 2020. Daily Continuous River Discharge Estimation for Ungauged Basins Using a Hydrologic Model Calibrated by Satellite Altimetry: Implications for the SWOT Mission. Water Resources Research 56. https://doi.org/10.1029/2020WR027309 

24. Jayathilake, D.I., Smith, T., 2020. Predicting the temporal transferability of model parameters through a hydrological signature analysis. Frontiers of Earth Science 14, 110– 123. https://doi.org/10.1007/s11707-019-0755-y 

25. Jha, R., and V.S., 2008. A review of hydrological estimation at ungauged sites in India, Colombo, SriLanka. International Water Management Institute, Working paper 130. 

26. Kapangaziwiri, E., Hughes, D.A., Wagener, T., 2012. Incorporating uncertainty in hydrological predictions for gauged and ungauged basins in southern Africa. Hydrological Sciences Journal 57, 1000–1019. https://doi.org/10.1080/02626667.2012.690881 

27. Kong, X., Li, Z., Liu, Z., 2019. Flood Prediction in Ungauged Basins by Physical-Based TOPKAPI Model. Advances in Meteorology 2019. https://doi.org/10.1155/2019/4795853 

28. Kratzert, F., Klotz, D., Herrnegger, M., Sampson, A.K., Hochreiter, S., Nearing, G.S., 2019. Toward Improved Predictions in Ungauged Basins: Exploiting the Power of Machine Learning. Water Resources Research 55, 11344–11354. https://doi.org/10.1029/2019WR026065 

29. Kumar, S. v., Reichle, R.H., Harrison, K.W., Peters-Lidard, C.D., Yatheendradas, S., Santanello, J.A., 2012. A comparison of methods for a priori bias correction in soil moisture data assimilation. Water Resources Research 48. https://doi.org/10.1029/2010WR010261 

30. Kunnath-Poovakka, A., Ryu, D., Renzullo, L.J., George, B., 2016. The efficacy of calibrating hydrologic model using remotely sensed evapotranspiration and soil moisture for streamflow prediction. Journal of Hydrology 535, 509–524. https://doi.org/10.1016/j.jhydrol.2016.02.018 

31. Laiolo, P., Gabellani, S., Campo, L., Silvestro, F., Delogu, F., Rudari, R., Pulvirenti, L., Boni, G., Fascetti, F., Pierdicca, N., Crapolicchio, R., Hasenauer, S., Puca, S., 2016. Impact of different satellite soil moisture products on the predictions of a continuous distributed hydrological model. International Journal of Applied Earth Observation and Geoinformation 48, 131–145. https://doi.org/10.1016/j.jag.2015.06.002 

32. Li, Y., Grimaldi, S., Pauwels, V.R.N., Walker, J.P., 2018. Hydrologic model calibration using remotely sensed soil moisture and discharge measurements: The impact on predictions at gauged and ungauged locations. Journal of Hydrology 557, 897–909. https://doi.org/10.1016/j.jhydrol.2018.01.013 

53 

33. McIntyre, N., Lee, H., Wheater, H., Young, A., Wagener, T., 2005. Ensemble predictions of runoff in ungauged catchments. Water Resources Research 41. https://doi.org/10.1029/2005WR004289 

34. Milzow, C., Krogh, P.E., Bauer-Gottwein, P., 2011. Combining satellite radar altimetry, SAR surface soil moisture and GRACE total storage changes for hydrological model calibration in a large poorly gauged catchment. Hydrology and Earth System Sciences 15, 1729–1743. https://doi.org/10.5194/hess-15-1729-2011 

35. Mulvaney T, 1851. On the use of self-registering rain and flood gauges in making observations of the relation of rainfall and flood discharges in given catchment. Transactions of the Institution of Civil Engineers of Ireland 4, 18–33. 

36. Nandagiri, L., 2007. Calibrating hydrological models in ungauged basins: possible use of areal evapotranspiration instead of streamflows VSA Modeling View project Integrated Water Resources Management View project. 

37. Narbondo, S., Gorgoglione, A., Crisci, M., Chreties, C., 2020. Enhancing physical similarity approach to predict runoff in ungauged watersheds in sub-tropical regions. Water (Switzerland) 12. https://doi.org/10.3390/w12020528 

38. Nayak, A.K., Biswal, B., Sudheer, K.P., 2021. Role of hydrological model structure in the assimilation of soil moisture for streamflow prediction. Journal of Hydrology 598. https://doi.org/10.1016/j.jhydrol.2021.126465 

39. Parajka, J., Naeimi, V., Blöschl, G., Komma, J., 2009. Hydrology and Earth System Sciences Matching ERS scatterometer based soil moisture patterns with simulations of a conceptual dual layer hydrologic model over Austria, Hydrol. Earth Syst. Sci. 

40. Perrin, C., Michel, C., Andréassian, V., 2003. Improvement of a parsimonious model for streamflow simulation. Journal of Hydrology 279, 275–289. https://doi.org/10.1016/S0022-1694(03)00225-7 

41. Price, A.L., Patterson, N.J., Plenge, R.M., Weinblatt, M.E., Shadick, N.A., Reich, D., 2006. Principal components analysis corrects for stratification in genome-wide association studies. Nature Genetics 38, 904–909. https://doi.org/10.1038/ng1847 

42. Rajib, M.A., Merwade, V., Yu, Z., 2016. Multi-objective calibration of a hydrologic model using spatially distributed remotely sensed/in-situ soil moisture. Journal of Hydrology 536, 192–207. https://doi.org/10.1016/j.jhydrol.2016.02.037 

43. Razavi, T., Coulibaly, P., 2016. Improving streamflow estimation in ungauged basins using a multi-modelling approach. Hydrological Sciences Journal 61, 2668–2679. https://doi.org/10.1080/02626667.2016.1154558 

54 

44. Refsgaard, J.C., Storm, B., 1990. Construction, Calibration And Validation of Hydrological Models. pp. 41–54. https://doi.org/10.1007/978-94-009-0257-2_3 

45. Rientjes, T.H.M., Muthuwatta, L.P., Bos, M.G., Booij, M.J., Bhatti, H.A., 2013. Multivariable calibration of a semi-distributed hydrological model using streamflow data and satellite-based evapotranspiration. Journal of Hydrology 505, 276–290. https://doi.org/10.1016/j.jhydrol.2013.10.006 

46. Rockwood, D.M., and M.L.N., 1966. Computer application to streamflow synthesis and reservoir regulation. International Commission on Irrigation and Drainage, Sixth Congress. 

47. Shahrban, M., Walker, J.P., Wang, Q.J., Robertson, D.E., 2018. On the importance of soil moisture in calibration of rainfall–runoff models: two case studies. Hydrological Sciences Journal 63, 1292–1312. https://doi.org/10.1080/02626667.2018.1487560 

48. Sherman, L.K., 1932. The relation of hydrographs of runoff to size and character of drainage-basins. American Geophysical Union 13, 332–339. 

49. Silvestro, F., Gabellani, S., Rudari, R., Delogu, F., Laiolo, P., Boni, G., 2015. Uncertainty reduction and parameter estimation of a distributed hydrological model with ground and remote-sensing data. Hydrology and Earth System Sciences 19, 1727–1751. https://doi.org/10.5194/hess-19-1727-2015 

50. Sivapalan, M., 2003a. Prediction in ungauged basins: a grand challenge for theoretical hydrology. Hydrological Processes 17, 3163–3170. https://doi.org/10.1002/hyp.5155 

51. Sivapalan, M., 2003b. Prediction in ungauged basins: a grand challenge for theoretical hydrology. Hydrological Processes 17, 3163–3170. https://doi.org/10.1002/hyp.5155 

52. Song, J., Xia, J., Zhang, L., Wang, Z.H., Wan, H., She, D., 2016. Streamflow prediction in ungauged basins by regressive regionalization: A case study in Huai River Basin, China. Hydrology Research 47, 1053–1068. https://doi.org/10.2166/nh.2015.155 

53. Storn, R., Price, K., 1997. Differential Evolution – A Simple and Efficient Heuristic for global Optimization over Continuous Spaces. Journal of Global Optimization 11, 341– 359. https://doi.org/10.1023/A:1008202821328 

54. Sutanudjaja, E.H., van Beek, L.P.H., de Jong, S.M., van Geer, F.C., Bierkens, M.F.P., 2014. Calibrating a large-extent high-resolution coupled groundwater-land surface model using soil moisture and discharge data. Water Resources Research 50, 687–705. https://doi.org/10.1002/2013WR013807 

55. Thorstensen, A., Nguyen, P., Hsu, K., Sorooshian, S., 2016. Using densely distributed soil moisture observations for calibration of a hydrologic model. Journal of Hydrometeorology 17, 571–590. https://doi.org/10.1175/JHM-D-15-0071.1 

55 

56. Valéry, A., Andréassian, V., Perrin, C., 2014. “As simple as possible but not simpler”: What is useful in a temperature-based snow-accounting routine? Part 2 - Sensitivity analysis of the Cemaneige snow accounting routine on 380 catchments. Journal of Hydrology 517, 1176–1187. https://doi.org/10.1016/j.jhydrol.2014.04.058 

57. van Emmerik, T., Mulder, G., Eilander, D., Piet, M., Savenije, H., 2015. Predicting the ungauged basin: Model validation and realism assessment. Frontiers in Earth Science 3. https://doi.org/10.3389/feart.2015.00062 

58. Ven Te Chow; David R Maidment; Larry W Mays, 1988. Applied hydrology. 

59. Vrugt, J.A., Gupta, H. v., Bouten, W., Sorooshian, S., 2003. A Shuffled Complex Evolution Metropolis algorithm for optimization and uncertainty assessment of hydrologic model parameters. Water Resources Research 39. https://doi.org/10.1029/2002WR001642 

60. Vrugt, J.A., ter Braak, C.J.F., Gupta, H. v., Robinson, B.A., 2009. Equifinality of formal (DREAM) and informal (GLUE) Bayesian approaches in hydrologic modeling? Stochastic Environmental Research and Risk Assessment 23, 1011–1026. https://doi.org/10.1007/s00477-008-0274-y 

61. Wagener, T., Gupta, H. v., 2005. Model identification for hydrological forecasting under uncertainty. Stochastic Environmental Research and Risk Assessment 19, 378–387. https://doi.org/10.1007/s00477-005-0006-5 

62. Willem Vervoort, R., Miechels, S.F., van Ogtrop, F.F., Guillaume, J.H.A., 2014. Remotely sensed evapotranspiration to calibrate a lumped conceptual model: Pitfalls and opportunities. Journal of Hydrology 519, 3223–3236. 

63. Zhao, R.-J., 1980. The xinanjiang model. Proceedings of the Oxford Symposium. 

56 



<!-- Start of picture text -->
A\T UT,<br>“eSAa<br>i wh =] =} r<br>2 fil Mn §<br>aaiotafe afaa: |<br>WARANGAL<br><!-- End of picture text -->



<!-- Start of picture text -->
A\TUT,<br>A<br>: P<br>\ =| i rf<br>2 ih Ml »<br>anitafe afeie. |<br>WARANGAL<br><!-- End of picture text -->



# **DISSERTATION APPROVAL FOR M. TECH** 

This dissertation entitled **“Assessment of Combined Effects of Climate Change and Land Use Land Cover Change on Streamflow”** by **Gorantla Indraja (21CEM4R13)** is approved for the degree of **Master of Technology** in **Civil Engineering** with the specialization in **Water Resources Engineering.** 

##### **Examiners** 

##### **Supervisor** 

- (Dr. Vema Vamsi Krishna) 

##### **Chairman** 

**Date:** _____________ 

**Place: Warangal** 

ii 

# **DECLARATION** 

I **(Gorantla Indraja)** , bearing **Roll number – 21CEM4R13** hereby declare that the dissertation entitled **“Assessment of Combined Effects of Climate Change and Land Use Land Cover Change on Streamflow”** under the supervision of Dr. Vema Vamsi Krishna is submitted in partial fulfilment of the requirements for the award of the Degree of Master of Technology in Civil Engineering with specialization in Water Resources Engineering. I declare that this writing submission, reflects my views in my own words, and when I have included other’s thoughts or words, I have properly acknowledged and referenced those original sources. Furthermore, I declared that I had followed all standards of academic honesty and integrity and that I had not created or manipulated any idea, data, fact, or source in my submission. I am aware that any violation of the aforementioned rules will result in institute disciplinary action and may also result in penalties from the sources which were improperly cited or from whom proper permission was not obtained when required. 

**Gorantla Indraja** 

**Roll. No: 21CEM4R13** 

**Date: ____________** 

iii 

# **ACKNOWLEDGEMENT** 

I avail this opportunity to express my deepest gratitude and indebtedness to my esteemed supervisor **Dr. Vema Vamsi Krishna** , Assistant Professor, Department of Civil Engineering, National Institute of Technology, Warangal for his sustained interest, sincere guidance, constant supervision, and encouragement in carrying out this project work. His valuable and precise criticisms have helped me academically. 

I feel greatly indebted and record my profound sense of reverence and gratitude to **Prof. Gunneswara Rao T D** , Head of the Civil Engineering Department, NIT, Warangal, for his valuable support by ensuring the facilities to carry out my thesis work and also directly or indirectly extending his help and support, throughout the work. 

I am also grateful to acknowledge **Dr. Litan Kumar Ray** , Course coordinator, Water Resources Engineering specialization for providing suggestions and comments during my thesis work. 

I express my gratitude to all the faculty members of Water Resources Engineering specialization, **Prof. N V Umamahesh** , **Prof. KV Jayakumar, Prof. P. Anand Raj, Sri V.N. Kameswara Rao, Dr. Manish Pandey and Dr. Litan Kumar Ray** for their wholehearted cooperation, painstaking effort and pragmatic ideas for my thesis to be completed within the stipulated period of time. 

I would also like to thank the research scholars **Ms. Aashi Agarwal** , **Mr. Chakkaralla Mohammad Rafi** , and **Ms. Dasari** **<mark>Bheemaiahgari Indhu</mark>** for sharing their wealth of knowledge, valuable suggestions and supported me along the way. 

I express a heartfelt and sincere gratitude to my beloved parents for their tremendous motivation and moral support to complete my M. Tech Dissertation work and I also thank all my friends, fellow classmates for their support and eternal inspiration during this endeavour. 

##### **GORANTLA INDRAJA** 

**Roll.no: 21CEM4R13** 

iv 

# **ABSTRACT** 

The present study aims to evaluate and quantify the individual and combined impacts of climate change and LULC change on streamflow within the Brahmani and Baitarani basin located in eastern India. The study area has undergone rapid LULC changes due to an increase in the built-up area in recent years. The climate variability in the basin was analysed by computing 15 climate indices at varying time scales. The variations in hydro-meteorological data, such as precipitation, temperature along with climate indices, was analysed using the Mann-Kendall test and Sen’s slope test to determine the significance of trends. Correlation analysis between climate indices and streamflow data revealed the individual impact of climate change on streamflow, in which precipitation indices have significant positive relation and temperature indices exhibit negative correlation with the streamflow. The trend analysis is extended to the future period (2025-2100), which utilized CMIP6 GCM downscaled and bias- corrected future climate data. The LULC change detection within the basin indicated a rapid increase in builtup class at the expense of forest, leading to a reduction in forest cover. The LULC maps of the years 2007, 2014 and 2021 were classified using machine learning algorithms and the future LULC maps were also predicted using CA-ANN model for the years 2028, 2035, 2056 and 2070 and this analysis also revealed that there is a notable increase in trend in built-up in the future period as compared to LULC map of 2014. The study also quantified the relative contributions of changing climate and land use alterations on the streamflow variations over decadal time periods using SWAT model. The change in the streamflow for a particular decade was analysed by assuming the preceding decade as the baseline condition. For instance, the change in the 1991-2000 decade due to climate and LULC was assessed by considering 19811990 as the baseline condition, and the change in the 2001-2010 decade was compared against the 1991-2000 decade. The relative contributions of climate are obtained as 21.27%, 53.36% and 50.62% and for LULC change 78.23%, 46.64% and 49.38% for the three impacted periods respectively. The future scenarios of different SWAT models revealed that the far future is resulting in high streamflow when compared to the near future under SSP 585 scenario, thus providing an insight into variations of streamflow due to integrated impacts of climate and LULC changes, which could help decision makers and water managers in planning suitable adaptation strategies for a sustainable water resources management. 

v 

# **TABLE OF CONTENTS** 

|ABSTR|ACT…………………………………………………………………………………...v|
|---|---|
|TABLE|OF CONTENTS……………………………………………………………………..vi|
|LIST O|F FIGURES…………………………………………………………………………...ix|
|LIST O|F TABLES……………………………………………………………………...……xii|
|1.<br>IN|TRODUCTION ............................................................................................................. 1|
|1.1.|General ........................................................................................................................ 1|
|1.2.|Climate Change and LULC change impacts on streamflow ....................................... 2|
|1.3.|Problem Statement ...................................................................................................... 3|
|1.4.|Objectives .................................................................................................................... 4|
|1.5.|Organisation of Thesis ............................................................................................. 4|
|2.<br>LI|TERATURE REVIEW .................................................................................................. 5|
|2.1.|General ........................................................................................................................ 5|
|2.2.|Studies on climate change ........................................................................................... 5|
|2.3.|Studies on LULC change ............................................................................................ 7|
|2.4.|Combined effects of climate and LULC change on streamflow ................................. 9|
|2.5.|Summary of Literature review .................................................................................. 11|
|3.<br>ST|UDY AREA AND DATA .......................................................................................... 12|
|3.1.|Study area .................................................................................................................. 12|
|3.2.|Data ........................................................................................................................... 13|
|3.|2.1.<br>Precipitation ....................................................................................................... 13|
|3.|2.2.<br>Temperature ....................................................................................................... 14|
|3.|2.3.<br>Streamflow ......................................................................................................... 14|
|3.|2.4.<br>Data required for hydrological modelling.......................................................... 15|
|3.|2.5.<br>Data used for LULC prediction ......................................................................... 16|
|4.<br>M|ETHODOLOGY .......................................................................................................... 19|
|4.1.|General ...................................................................................................................... 19|
|4.2.|Analysis of the climate change signals ..................................................................... 20|
|4.|2.1.<br>Climate indices................................................................................................... 21|
|4.|2.2.<br>Trend analysis .................................................................................................... 25|
|4.|2.3.<br>Correlation analysis ........................................................................................... 27|
|4.|2.4.<br>Cross-correlation analysis .................................................................................. 27|



vi 

|4.3.<br>L|ULC change analysis .............................................................................................. 28|
|---|---|
|4.3.1.|Image pre-processing ......................................................................................... 28|
|4.3.2.|LULC classification ........................................................................................... 30|
|4.3.3.|Accuracy assessment and confusion matrix ...................................................... 32|
|4.3.4.|Historic LULC change analysis ......................................................................... 33|
|4.3.5.|Prediction of future LULC maps ....................................................................... 34|
|4.4.<br>H|ydrological Modelling ............................................................................................ 36|
|4.4.1.|Soil and Water Assessment Tool (SWAT) model ............................................. 36|
|4.4.2.|SWAT model setup ............................................................................................ 37|
|4.4.3.|Calibration and Validation of SWAT model ..................................................... 38|
|4.4.4.|Performance of SWAT model ........................................................................... 38|
|4.4.5.<br>future|Assessing combined impacts of climate and LULC change on historic and<br>streamflow ............................................................................................................. 41|
|5.<br>RESU|LTS AND DISCUSSIONS .................................................................................... 43|
|5.1.<br>Tr|ends in meteorological data ................................................................................... 43|
|5.2.<br>Tr|end in Climate indices ........................................................................................... 44|
|5.2.1.|Temperature related indices in historical period ................................................ 44|
|5.2.2.|Precipitation related indices in historical period ................................................ 46|
|5.3.<br>R|elations Between Streamflow and Extreme Climate Indices .................................. 46|
|5.3.1.|Annual time scale results of correlation analysis ............................................... 46|
|5.3.2.|Seasonal results of correlation analysis ............................................................. 48|
|5.3.3.|Monthly results of correlation analysis .............................................................. 49|
|5.3.4.|Cross-correlation analysis at monthly time step ................................................ 50|
|5.4.<br>A|nalysis of future climate change indices................................................................. 52|
|5.4.1.|Trends in Climate Indices for Future Time Period for SSP245 Scenario .......... 55|
|5.4.2.|Trends in Climate Indices for Future Time Period for SSP585 Scenario .......... 58|
|5.4.3.|Comparison of historical and future climate signals .......................................... 58|
|5.5.<br>L|ULC change analysis within the study watershed .................................................. 59|
|5.5.1.|Accuracy Assessment of the classified LULC maps ......................................... 59|
|5.5.2.|Historical LULC changes .................................................................................. 61|
|5.6.<br>Pr|ediction of future LULC maps ............................................................................... 62|
|5.6.1.|Transition Matrix for ANN input ....................................................................... 62|
|5.6.2.|Sensitivity analysis of Spatial Variables and Hyperparameters of ANN model 63|
|5.6.3.|LULC Prediction ................................................................................................ 65|
|5.7.<br>H|ydrological Model (SWAT) Calibration and Validation ........................................ 69|



vii 

|5.|7.1.<br>Isolated impacts of climate and land use changes on the streamflow of the basin<br>73|
|---|---|
|5.|7.2.<br>Combined effects of climate and LULC changes on streamflow ...................... 76|
|6.<br>SU|MMARY AND CONCLUSIONS .............................................................................. 78|
|6.1.|Summary and Conclusions ........................................................................................ 78|
|6.2.|Limitations of the work ............................................................................................. 80|
|6.3.|Scope for future studies ............................................................................................. 81|



viii 

**Page** 

## **Figure no.** 

## **LIST OF FIGURES** 

|Figure 3.1 Study area of Brahmani and Baitarni basin ............................................................ 13|
|---|
|Figure 3.2 Inner-annual cycle of the Streamflow, mean temperature and precipitation for the|
|period 1981-2018 ..................................................................................................................... 14|
|Figure 3.3 (a) DEM (b) Soil maps of Brahmani and Baitarni basin ........................................ 15|
|Figure 3.4 Decadal LULC maps of Brahmani and Baitarni basin of the for the years (a) 1985,|
|(b) 1995 and (c) 2005 ............................................................................................................... 16|
|Figure 3.5 Road and railway maps of Brahmani and Baitarni basin ....................................... 17|
|Figure 3.6 Spatial variables for the future LULC prediction (a) Elevation(m) (b) Aspect (c)<br>slope (d) distance from river (m) (e) Population density (person per sq.km) (f) Precipitation<br>(mm) (g) Distance from road (h) Distance from built-up and (i) Distance from rail (m) ........ 18|
|Figure 4.1 Flowchart depicting overall methodology for the study......................................... 20|
|Figure 4.2 Flowchart depicting methodology for climate change analysis ............................. 21|
|Figure 4.3 Flowchart depicting methodology for LULC analysis ........................................... 29|
|Figure 4.4 Flowchart depicting methodology for SWAT model setup .................................... 37|
|Figure 4.5 SWAT scenario combinations for assessing the relative contributions of climate|
|and land use alterations ............................................................................................................ 40|
|Figure 5.1 Trend in meteorological data (Precipitation, Maximum temperature and Minimum|
|temperature) in historic period ................................................................................................. 43|
|Figure 5.2. Trend in climate change indices in the historic period 5.2(a) to 5.2(j) trend in<br>precipitation indices evaluated for the period 1901-2018 and 5.2(k) to 5.2(o) trend in|
|temperature indices evaluated for the period 1951-2018 ......................................................... 45|
|Figure 5.3  Correlation   analysis performed between climate change indices and streamflow|
|in Brahmani and Baitarni basins at the annual time scale for the period 1981-2018 .............. 47|
|Figure 5.4 Correlation coefficient between the selected indices and streamflow on seasonal<br>time scale (1981-2018) in Brahmani basin .............................................................................. 49|



ix 

Figure 5.5 Correlation coefficient between the selected indices and streamflow on seasonal time scale (1981-2018) in Baitarni basin ................................................................................. 49 Figure 5.6  Correlation coefficient between the selected indices and streamflow on monthly time scale, for the period 1981-2018 ....................................................................................... 50 Figure 5.7 Correlation coefficients for streamflow and monthly extreme climate indices for different time lags for Brahmani basin .................................................................................... 51 Figure 5.8 Correlation coefficients for streamflow and monthly extreme climate indices for different time lags for Brahmani basin .................................................................................... 52 Figure 5.9 Trend in meteorological data of the GCM (MPI-ESMI-2-HR) for the period 20252100 (a) Precipitation (b) Maximum temperature and Minimum temperature under SSP126, SSP245, SSP370 and SSP585 .................................................................................................. 54 Figure 5.10 Trend in climate indices computed for the future period (2025-2100) under SSP 245 scenario ............................................................................................................................. 56 Figure 5.11 Trend in climate indices computed for the future period (2025-2100) under SSP 585 scenario ............................................................................................................................. 57 Figure 5.12 Accuracy assessment of LULC maps using OA and Kappa for the years (a) 2007, (b) 2014 and (c) 2021 classified using RF, SVM and CART .................................................. 60 Figure 5.13 Classified LULC maps for the years (a)2007 (b)2014 and (c)2021 using RF algorithm .................................................................................................................................. 62 Figure 5.14: Network learning curve of ANN with number of iterations vs error for both training and validation period .................................................................................................. 66 

Figure 5.15 Comparison of LULC maps predicted using ANN for the years (a) 2028 (b)2035 (c)2056 and (d)2070 and LR for the years (d) 2028 (e)2035 (f)2056 and (g)2070 ................. 68 Figure 5.16 Comparison between the observed and simulated flows for the four base models in the calibration period (a) 1983-1987 (c) 1983-1997 (e) 2003-2007 (g) 2011-2014 and in the validation period (b) 1988-1990 (d) 1998-2000 (f) 2008-2010 and (h) 2015-2017 ................ 71 Figure.5.17 Time series plot of rainfall hyetograph and observed stream flow for the period 2011-2017 (a) Calibration period (2011-2014) and validation period (2015-2017)................ 72 Figure 5.18 Scatter plot between rainfall and runoff for the period 2011-2017 ...................... 72 

x 

Figure 5.19 Mean monthly streamflow in the historic period with respect to the baseline scenario for different Land use maps (a) scenarios relating to L1(1985) (b) scenarios relating to L2(1995) (c) scenarios relating to L3(2005) (d) scenarios relating to L4(2017)................. 76 Figure.5.20  Mean monthly streamflow in both historic and future period for (a) M7 model (LULC 2005) (b) M8 model with different emission scenarios relating to L2(2035) where S1 is SSP 126, S2 is SSP245, S3 is SSP 370 and S4 is SSP 585 .................................................. 77 

xi 

## **Table no.** 

## **LIST OF TABLES** 

## **Page** 

|Table 4.1: Description of Satellite imagery and different bands used for LULC classification|
|---|
|for deriving the LULC maps of 2007, 2014 and 2021 ............................................................. 30|
|Table 4.2: Description of the LULC classes considered for the present study and number of|
|training sites given for each class during the LULC classification ......................................... 31|
|Table 4.3 Description of SWAT models grouped by different climate and land use|
|information ............................................................................................................................... 38|
|Table 4.4: Description of SWAT model scenarios for the near future (2021-2050) and far|
|future period (2051-2090) ........................................................................................................ 41|
|Table 4.5. Description of SWAT model scenarios for the historic (1981-2017) and near future|
|period (2025-2050) .................................................................................................................. 42|
|Table 5.1: Users accuracy and Producers accuracy of different classes of LULC maps for the|
|years 2007, 2014 and 2021 classified using three different machine learning algorithms|
|CART, SVM and RF................................................................................................................ 60|
|Table 5.2: Area of different LULC classes (km<sup>2</sup>) for the historic period 1985-2014 and|
|Percentage changes in area between different years ................................................................ 62|
|Table 5.3: Transition matrix that illustrates the probability of conversion of one class to other|
|class for the period 2007-2014 ................................................................................................. 63|
|Table 5.4: Sensitivity analysis of nine spatial variables using four schemes S1, S2, S3 and S4|
|and training kappa .................................................................................................................... 64|
|Table 5.5: Trails performed for the sensitivity analysis of hyper parameters of the ANN|
|model........................................................................................................................................ 64|
|Table 5.6: Percentage changes of different land use classes of future LULC maps obtained|
|from both ANN and LR when compared to historic LULC map of 2014 ............................... 66|
|Table 5.7 Description of sensitive parameters, their range and best fitted values of the base|
|models M1, M2, M3 and M4 ................................................................................................... 70|
|Table 5.8: Performance evaluation measures of different SWAT model set-ups using NSE,|
|PBIAS and R<sup>2</sup>.......................................................................................................................... 73|



xii 

Table 5.9 Change in streamflow due to climate change and land use change and total changes .................................................................................................................................................. 74 

Table 5.10 Relative contribution of climate change and Land use change to streamflow variations .................................................................................................................................. 75 

xiii 

# **CHAPTER 1** 

# **1. INTRODUCTION** 

## **1.1. General** 

Climate change is a persistent global issue, and its impacts are being experienced in a variety of ways. The projections made by the Inter-Governmental Panel on Climate Change (IPCC) through their Couple Model Inter-comparison Project (CMIP5) experiment, it is observed that there is a global average surface temperature increase of 2°C to 4.5°C by the year 2100, accompanied by doubled atmospheric carbon dioxide levels. In India, the average temperature has already risen by 0.7°C and the precipitation has increased by approximately 6% in the 20<sup>th</sup> century, with more rapid changes in  recent decades (Krishnan et al., 2020). Climate change impacts are closely interconnected with Land Use and Land Cover (LULC) dynamics (Sundar et al., 2022). India has also experienced remarkable LULC changes such as agricultural expansion, deforestation, and urbanization. Agricultural lands, forests, and urban areas account for 53%, 21%, and 2% of the country's total geographical area, respectively, and these classes are experiencing changes at an alarming rate (Singh et al., 2018; ISRO, 2015). Changes in population growth, urbanization, and land use policies can alter these statistics, making it important to regularly update them to reflect changes in the landscape. Efficient land utilization, understanding of land use patterns, and monitoring changes over time are key factors involved in this process (Singh et al., 2018). The LULC changes would rapidly vary in future because of rapid population growth as it is the key driver of the world's changing land use (López et al., 2001), which results in an increasing demand for basic needs such as food, water and shelter. The growing water demand increases the stress on water resource projects. According to a study conducted by International Water Management Institute, underbusinessas-usual climatic scenario,  India's total water demand is projected to increase by 22% and 32% by 2025 and 2050, respectively(Amarasinghe et al., 2007). Furthermore, there is a consistent decrease in average annual per capita water availability from 5176 m3 in 1951 to 1816 m3  and 1545 m3 in the years 2001 and 2011 respectively, and it is expected to decline further to 1140 m3 in 2050 (CWC, 2011). As water availability is going to decrease in future because ofchanging climate and LULC dynamics ,it is crucial to examine the impacts of these factors on water resources.. 

1 

## **1.2. Climate Change and LULC change impacts on streamflow** 

The accumulation of greenhouse gases in the Earth's atmosphere is main cause for the global climate change, resulting in various noticeable signs such as rising global temperatures and shifts in the precipitation patterns. These signs are leading to altered hydrological cycles (Li et al., 2021), reduced water availability, seawater intrusion in coastal aquifers, alterations in groundwater recharge and increased risks of water-related hazards such as floods and droughts (Tabari, 2020). As there is a huge necessity of water resources in both human society and natural environment, it is crucial to foresee the water availability in the changing climate. Therefore, it has become importantto assess and quantify changes occurring in hydrological processes in response to climate change. . In particular, water availability and streamflow are particularly sensitive to changes in temperature and precipitation. However, evaluating these changes within a river basin and considering climate change scenarios alone may not be sufficient for  managing and planning water resources systems effectively, due to the interdependence of  LULC and climate changes .Apart from climate, LULC plays a vital role inducing the changes in components of hydrological cycle within a catchment. The LULC change refers to the transformation of natural ecosystems into human-modified landscapes, and it is among the most impactful human-induced modifications altering the Earth's surface (Lambin et al., 2003). The process of LULC change is a dynamic and complex phenomenon resulting from both natural factors and human interventions. The LULC changes are not only linked to climate change but also other environmental issues including land-atmosphere interactions and can affect the hydrology of the basin. Various studies have shown that small change in LULC can cause moderate impacts on runoff mechanisms (Tumsa, 2023). Thus, it is important to examine and analyse these changes at a catchment scale. Changes in LULC influences the water availability by altering the hydrological processes such as evapotranspiration, interception, and infiltration LULC changes can have impacts on the climate, while climate change also influences future land use patterns. However, the the frequency and intensity of the impacts may vary depending on the specific region. Therefore, gaining a comprehensive understanding of the hydrologic response within a river basin to changes in LULC and climate is necessaryfor planningwater resources and develop sustainable water management strategies effectively, whichrequires a thorough examination of long-term climate and LULC dynamics considering both temporal and spatial aspects. Numerous challenges arise when managing water resources and assessing LULC changes on a regional level, which include   limited scientific knowledge, complex interactions among land, 

2 

atmosphere and water, and the influence of rapid growth in population. As the sustainable availability of water is threatened by the two key drivers (climate and LULC), water scarcity becomes more prominent. Therefore, the hydrologic community has given significant attention on understanding the hydrologic impacts of both LULC and climate changes.Assessing the climate change impacts on the hydrology of the basin typically involves the use of hydrologicalmodels as well as Regional Climate Models (RCMs) or General Circulation Models (GCMs) or coupling of both. The GCMs are mathematical representations of the earth’s atmosphere or oceanic circulation. They are used to provide reliable information about past, present, and future climates. The GCMs  are developed with its unique sets of mathematical representations and assumptions of the physical processes in the climate, leading to variations in climate predictions. The assessment of LULC change uses the advent of the GIS techniques coupled with machine learning algorithms (Feizizadeh et al., 2023a), that has simplified the process of LULC classification and change detection (Abebe et al., 2022). The physically based hydrologic model, SWAT is widely recognized as an effective tool for studying the impacts of climate and land use changes, particularly in  investigating the hydrologic response of the streamflow (Lcrup et al., 1998; Li et al., 2009; Zhang et al., 2008).Problem Statement 

Several studies have primarily focused on individual climate change, LULC change impacts on streamflow and so on but the knowledge on the combined effects and proportion of each effect on streamflow is still lacking. To optimize water resource management in a river basin, it is necessary to have an understanding of the integrated and individual influences of climate change and LULC change on streamflow. The complex relationship between climate change and land use change has posed several challenges in understanding the nature of streamflow response, that has limited the number of studies exploring this aspect. Recent scientific efforts have shifted towards segregating the specific contributions of climate change and LULC change to streamflow in order to enhance the understanding in this research area. To have a complete understanding of the hydrologic response of the basin, a comprehensive framework is developed in this study to quantify and assess the isolatedand combined effects of climate change and LULC changes in both historic and future periods. This study provides valuable insights such as understanding long-term climate trends which is crucial for assessing the current climate conditions and how they may evolve in future and also helps in assessing the climate and LULC change impacts  on water resources. The knowledge on the historic LULC transformations and simulated scenarios helps decision-makers address the challenges 

3 

associated with the land use dynamics. The studies on integrated impacts of climate and LULC changes, aids policymakers and water resource managers to anticipate future trends in streamflow and make informed decisions, plan adaptation strategies for sustainable management of water resources. 

## **1.3. Objectives** 

The main aim of the present study is to evaluate and quantify the hydrologic response of the basin for the individual and joint impacts of climate change and LULC change in historic and future periods. The specific objectives for the present study are framed as: 

1. Analysis of the climate change signals in both historical and future periods within the catchment. 

2. Analysis of historical LULC changes and prediction of LULC maps for the future period. 

3. To assess the combined and individual effects of climate change and LULC change on the streamflow of the catchment. 

## **1.5.  Organisation of Thesis** 

The first chapter of this thesis serves as an introduction to the study outlining the methodology employed to conduct the research, problem statement, and objectives of the study. The second chapter is dedicated to a comprehensive literature review, highlighting the key findings that were obtained from previous research in the research areas relating to combined and isolated impacts of climate and LULC change on streamflow. The third chapter presents the detailed description of the study area and data used. In chapter four, the methodology utilized to address the research problem is described in detail. Chapter five presents the detailed analysis of the results obtained from the study, with a thorough discussion of the findings. Finally, chapter six provides a summary and conclusion of the study, presenting an overall picture of the research and its implications. 

4 

# **CHAPTER 2** 

# **2. LITERATURE REVIEW** 

## **2.1. General** 

The world is experiencing significant challenges posed by a combination of factors such as rapid industrialization, population growth, , urbanization, and the effects of climate change. These factors significantly influence LULC, and the hydrological cycle of the basin, which in turn effect the various hydrological processes such as soil infiltration, evaporation, evapotranspiration, and both surface and subsurface water dynamics. In this regard, it is important to examine the impact of  climate and LULC dynamics on the hydrology of the basin in order to comprehend future predictions and also formulate appropriate strategies. This chapter explores into three key areas that form the foundation of this research: climate variability, mapping and detecting changes in LULC, and hydrological modelling. It also discusses the review of research pertaining to the study on combined and individual effects of the climate and land use alterations on streamflow in both historic and future periods. 

## **2.2. Studies on climate change** 

Climate change is marked by significant and prolonged changes in climate variables (Abbass et al., 2022), including temperature and precipitation, over a period of several decades or more; and global temperatures are expected to rise by 1.8 to 4.0°C by the end of this century (IPCC, 2001). To gain the comprehensive understanding in   the climate variability , thorough research is required (Reboita et al., 2022), as this understanding is crucial for evaluating the potential consequences of  changing climate on various aspects of our environment and society (Malhi et al., 2020). As the water availability is likely to reduce due to climate variabilityin Indian river basins (Gosain et al., 2006), the deviation in the climate variables is evaluated in many studies (Abdila & Nugroho, 2021; Felix et al., 2021a; Pervin & Khan, 2022). This was achieved performing trend analysis to the climate variables such as temperature andprecipitation, using non-parametric Mann-Kendall trend test and Sen’s slope test (Gocic & Trajkovic, 2013; Jain et al., 2013; Kundu et al., 2015; Mondal et al., 2015) which helps in identifying whether there is a significant change in the variables over a long period and also the magnitude of the change. The auto-correlation analysis should be performed before analysing the trends in climate indices. The Mann-Kendall trend test and Sens slope test was performed at monthly, seasonal 

5 

and annual basis on a regional scale (Gocic & Trajkovic, 2013), as the different sectors and ecosystems respond to the climate change in a different way due to their sensitivity and adaptive capacity (Fortini & Schubert, 2017; Malhi et al., 2020). 

Many studies utilize climate indices to assess extreme events, including their intensity and frequency, associated with climate change (Easterling et al., 2012a; Li et al., 2021; Y. Li et al., 2022). The Expert Team on Climate Change Detection and Indices (ETCCDI) has developed 27 climate indices that aid in quantifying and assessing climate variability (Athar, 2014; Chervenkov & Slavov, 2020; Felix et al., 2021b). These indices utilize climate data such as precipitation, maximum and minimum temperature data, as the basis for their calculations (Reboita et al., 2022).  Several researchers have employed ETCCDI indices to advance the understanding of impacts on extreme weather events in response to climate change phenomena (Clarke et al., 2022; Easterling et al., 2012b; Kalyan et al., 2021). Research on climate change and extreme climate events evaluated using these indices is not only highly relevant but also gradually growing in importance in the recent years (Kalyan et al., 2021). Mann-Kendall test is also performed to the ETCCDI indices, as the trend analysis of climate data alone may not give the complete picture of climate change due to the compound interactions among various components of climate. The trend results of the ETCCDI climate indices focus on describing extreme events and provide a more comprehensive understanding of how climate extremes are changing over time (Felix et al., 2021a). It is also proved that, examining patterns and shifts in precipitation, requires trend analysis of varying time scales, specifically focused on monthly time scale (Ahmad et al., 2015). Consequently, it is essential to analyze extreme climate indices at an intervals of annual, seasonal, and monthly scales to gain a comprehensive knowledge of the detailed climate variability within the basin (Azam et al., 2018). 

According to Mbow et al., (2022), climate change also has potential effects not only on natural systems but also  various socio-economic sectors such as energy and agriculture, which increases  competition of resources needed. Apart from the above mentioned, climate change (changes in precipitation and temperature patterns) also has impacts on streamflow, which is a sensitive component of hydrological cycle (Arora et al., 2014; Cayan et al., 1993). The sensitivity of streamflow variations to the individual impacts of climate change were assessed by performing statistical analysis to climate and streamflow data (Duell, 1994; Swain et al., 2021a). On the other hand, regression model and correlation analysis were also instigated and simple parameterization was employed for the commonly used climate variables along with their long-term averaged values and streamflow (Kletti & Stefan, 1997). The Inverse Distance 

6 

Weighing (IDW) method was utilized to know the significant impacts of climate change (mainly precipitation) on the streamflow (Tehrani et al., 2019). Fathian et al., (2015) computed the Pearson’s correlation analysis between streamflow and climate variables, and observed that there is a good linear dependence between climate variables and streamflow. 

While analysing the historical climate data is for recognizing the present-day impacts of global warming when related to the historic period, the examination of climate trends in the future period is crucial for assessing climate risks in the future (Felix et al., 2021a). Several studies have used GCMs which simulate the future projections of climate variables to evaluate the impacts of  changing climate on hydrologic system (Balu et al., 2023; Carlos et al., 2020; Chokkavarapu & Mandla, 2019; Sadhwani et al., 2023; Visweshwaran et al., 2022). Recent studies are utilising CMIP6 future climate data sets as the CMIP6 models have shown significant improvement compared to CMIP5 by incorporating socioeconomic development factors alongside greenhouse gas emissions scenarios, (Gidden et al., 2018; Lovino et al., 2021).These developments have enabled future climate variable projections based on the SSPs comprising SSP126, SSP245, SSP370 and SSP585 (Lovino et al., 2021). 

## **2.3. Studies on LULC change** 

Changes in LULC and its impact on the environment and the ecosystem services is one the challenges that must be addressed globally (Sundar et al., 2022). The LULC changes may result in loss of biodiversity, alteration of the hydrological cycle, and plausibly climate change (Sleeter et al., 2018). The LULC change impacts can differ depending on local conditions, such as vegetation and soil type, whereas the land use impacts depend on the human interventions (Patel et al., 2019). Understanding and predicting changes in LULC is crucial for environmental management, natural resource management, and climate change modelling (Bhattacharya et al., 2021). By balancing economic development with environmental protection, the negative impacts of LULC can be minimized, and sustainable land use practices can be promoted. 

The advent of the GIS techniques and the remote sensing data has simplified the process of obtaining LULC data for any area (Abebe et al., 2022). The satellite imagery aids in collecting data over large areas, monitor and assess LULC changes regularly, create precise LULC maps and provide valuable information for decision-making at regional and global scales (Sundar et al., 2022). The LULC change detection and LULC maps would aid the urban planning management, environmentalists and policy makers (Kamaraj 2022). One of the challenges for 

7 

precise LULC mapping is the quality of the remote sensing products  (Chettry & Surawar, 2021). However, this problem is addressed by integration of multiple data sources. The ease in land use mapping using the remote sensing products is further augmented by cloud computing and artificial intelligence, including machine learning and deep learning (Feizizadeh et al., 2023a), which have brought new perspectives to enhance large-scale LULC mapping and prediction. One of the cloud computing platforms is the Google Earth Engine (GEE), that provides extensive computing power and access to different geospatial datasets (Nascetti et al., 2017). Machine learning algorithms are commonly used on GEE (Kamal et al., 2019; Zhou et al., 2020), that have already proven their abilities for LULC change detection and classification (Muhammad et al., 2022a). These algorithms, such as Random Forest (RF), Classification and Regression Trees (CART), and Support Vector Machine (SVM), and, can effectively learn and recognize patterns in satellite imagery, which helps in accurate predictions of the LULC (Hosseiny et al., 2022). (Lashkaripour et al., 2022; Tewabe & Fentahun, 2020) In addition to accurate mapping of the LULC, modelling the changes of the LULC in both space and time are essential for effective land use management. 

LULC modelling is crucial for understanding and predicting changes in land use over time and its effects on various environmental aspects.. . This helps to detect the changes that occurred or will possibly occur (Veldkamp & Lambin, 2001) and how frequently these changes will occur (kamaraj et al., 2022). Several studies have detected the LULC changes using the historical LULC data, and used this data along with topographic factors to predict the future land conversions and transitions using land prediction models (Eastman, 2012). 

Several studies have adopted CA, MC, LR and ANN to predict the future LULC changes  (Alsharif & Pradhan, 2015; Balogun & Ishola, 2017; Ozturk, 2015). However, using any of these models independently may not be able to predict LULC accurately. For instance, Markov model considers only temporal trends in LULC while ignoring spatial trends. Similarly, CA model, considers only spatial trends and does not consider the previous trends of LULC and ignores the importance of driving factors. The neural network models such as ANN, accurately project non-linear probabilistic conversions and find relation between spatial drivers in simulating changes in LULC (Pu, 2021), whereas regression models such as LR deal with only linear dependencies. This creates a need for integrated model to generate both spatial and temporal trends. One such application is MOLUSCE, a land-use modelling plugin in QGIS developed by NEXTGIS in 2017. It uses GIS and remote sensing data to simulate future LULC changes and is helpful in identifying areas at risk of change. It can inform LULC planning and 

8 

policy decisions to assess the potential effects of different land use scenarios on biodiversity, water resources, and other ecosystem services. It incorporates different algorithm modules such as Artificial Neural Network (ANN), Logistic regression (LR), Weights of Evidence (WoE) models (Alam et al., 2021; Muhammad et al., 2022b) to simulate spatiotemporal transitioning probabilities. Integration of CA-ANN model aids in predicting spatial LULC move by assessing the present state of the pixel based on preliminary situation, adjacent neighborhood possibility and transitional rules (Saputra & Lee, 2019) that improvises the accuracy of the prediction. 

## **2.4. Combined effects of climate and LULC change on streamflow** 

LULC and climate dynamics are the two main drivers that affects the hydrological processes at the basin scale (Chawla & Mujumdar, 2015). Hydrological models play a crucial role in studying the impacts of climate change and LULC change on hydrological processes (Chawla & Mujumdar, 2015; Dey & Mishra, 2017). To advance the understanding of hydrological processes and effective management of water resources, it is essential to review and evaluate the performance of different hydrological models. Such reviews can help identify the strengths, limitations, and applicability of various modelling approaches, allowing researchers and practitioners to choose the most suitable model for their specific research objectives and study area. Among the wide array of hydrological models available, the SWAT has gained significant recognition as an interdisciplinary watershed model, in recent years. Researchers have extensively utilized SWAT for studying the impacts of climate variability in these domains (Abbaspour et al., 2009; Sinha et al., 2020a; Uniyal et al., 2015). Its versatility and effectiveness have led to its adoption in several countries (Dile et al., 2016). The SWAT is a physically based semi-distributed hydrological model that links anthropogenic and climate forcing on the hydrologic response of the watershed (Swain et al., 2021).   The SWAT has demonstrated its versatility through a wide range of applications in various fields such as to study the impact of plant growth (Strauch & Volk, 2013), examining the response of snowmelt in a particular region (Myers et al., 2021), transport of pesticides (Dogan & Karpuzcu, 2023), climate change impact assessments (Li & Fang, 2021), assess the impact of LULC changes on a watershed (Sinha et al., 2020a), estimation of sediment transportation and soil erosion (Sinha et al., 2020b), analyse land management practices, transport and transformation of nutrients. 

9 

To study the isolated or combined impacts of changing climate and LULC on hydrological processes in different regions of the world, SWAT model has developed. Swain et al., (2021) quantitatively assessed the individual impacts of and LULC alterations and climate change  on the streamflow variations using three complementary techniques, m-SCARQ (slope change ratio approach), m-DMC approach, and hydrological modelling (SWAT) approach. The outcome of the first two methods resulted as land use changes have a major contribution on streamflow variations; however SWAT specifies the equal contributions from both LULC alterations and climate change. (Swain et al., 2020)used the SWAT to analyse the effect of various factors on water balance components (WBCs) at a decadal scale. A stochastic approach based on quantile regression was employed to analyze uncertainties resulting from different simulations considering climate change, land-use alterations, and model parameters. The study quantified WBCs, including surface runoff, evapotranspiration, lateral flow, water yield, deep aquifer recharge and soil moisture storage.  The outcomes have practical implications for maintaining a balance between water demand and availability to prevent scarcity of water. Han et al., (2022) examined the correlation between croplands and hydrological sensitivity in catchments over a span of multiple years. The findings indicate that croplands have a substantial impact on increasing actual evapotranspiration and reducing runoff. However, changes in storage of water are generally unaffected by croplands on an annual basis. The efficiency of sensitivity of the inter-annual hydrological framework is further explained through the application of a hydrological model. Uniyal et al., (2015) intended to analyse the effect of changes in climate on water balance components of the Upper Baitarani River basin that has scarcity of data using Uniyal et al., (2015)SWAT model and considered twelve independent scenarios of climate and twenty eight combined specific area scenarios. The analysis of model outcomes for the twelve independent scenarios revealed a decrease in surface runoff as the temperature increased. Conversely, an increase in rainfall suggested a rise in surface runoff compared to the baseline condition. The study of of the LULC change impacts on the stream flow of the Upper Baitarani basin using the SWAT integrated with ArcGIS indicated a significant rise in built-up land and a reduction in forest area and agricultural land over an 18-year period. These changes resulted in the increased mean annual streamflow. This study demonstrates that SWAT can effectively evaluate the impact of LULC alterations on stream flow. 

10 

## **Summary of Literature review** 

The studies on climate change analysis have adopted Mann-Kendall and Sens slope test and ETCCDI indices were computed, but the recent studies have not assessed the individual effect of changing climate on streamflow variations using correlation and cross-correlation analysis. Although, several studies have considered historical LULC maps and spatial factors for future prediction, yet the effect of socio-economic factors on LULC change has not been fully explored. Also, the relative importance of combined topographic and sociological factors such as DEM, Slope, proximity to roads, population density etc. has not been considered in the many previous studies. Many studies have assessed either integrated or the individual impacts of climate variability and LULC change. 

11 

# **CHAPTER 3** 

# **3. STUDY AREA AND DATA** 

## **3.1. Study area** 

The Brahmani and Baitarni basin is situated in India, covering an area of 51,822 sq. km. It comprises of Brahmani basin, which spans over 39,033 sq. km, and the Baitarni basin, which spans over 12,789 sq. km.  The basin is geographically located between <mark>83°55’E to 87°3’ E longitudes and 20°28’N to 23°38’ N latitudes</mark> . Brahmani river originates in the highlands of Jharkhand and joins the Bay of Bengal as shown in Fig. 3.1. The Baitarni river is a tributary of Brahmani River and also originates in Jharkhand. The length of Brahmani and Baitarni rivers are 799 km and 355 km respectively. 

The Brahmani and Baitarni Basin faces several challenges in environment, including soil erosion, and deforestation. The hydrology in the region has undergone significant changes in recent years, which can be attributed to both climate and LULC change. The river basin is also prone to flooding, which causes significant damage to the region's infrastructure and agriculture (Swain et al., 2021a). The demand for water in the basins is catered from the Salandi and Rengali reservoirs located in the upstream of the Anandpur and Jenapur gauging stations. However, due to insufficient data the dams were not considered in modelling the hydrological processes of the basins. From previous studies, it is observed that, there is rapid growth in the built-up land in these basins (Mahato et al., 2022). With increasing demand for water, rapidly changing landscapes, and the projected impacts of changing climate, it is imperative to understand the climate change and LULC change impacts on the hydrological variables for sustainable development. 

12 



<!-- Start of picture text -->
Index map of Brahmani and Baitarni basin<br>84°0'0"E 85°0'0"E 86°0'0"E 87°0'0"E<br>ra N z<br>a> x o e |8<br>Ben mek ; N<br>\ ma a 4<br>Sse sgt Mage w E<br>bf f<br>4 ® iM<br>Ls 4 ° 2<br>fo ia Motte, > 2<br>q Ck pp Re oh}<br>_peeNg3,5 Ww DPbs© cp oeOCSwr ¢qtA? z z<br>a ae Fad <4 » = 5<br>q = py¥ $~ rif-f .> N=) r=)<br>\ ,te CRS<br>poeAsoefee<br>izE<br>,Bat 2 =<br>\ 4 7 -<br>%=z<br>Fs2N Ooa25 50 100 150es200 Kilometers ag2N<br>84°0'0"E 85°0'0"E 86°0'0"E 87°0'0"E<br><!-- End of picture text -->

### **3.2.2. Temperature** 

The temperature in this basin generally varies depending on the time of year. During the summer months, which typically is from March to June, temperatures in the Brahmani and Baitarani basins can range from 30°C to 40°C or higher. In the winter months, which typically are from December to February, temperatures can drop to around 10°C to 15°C (Fig. 3.2). In the monsoon season, temperatures tend to be relatively cooler due to augmented cloud cover and rainfall. The temperature data is downloaded from India Meteorological Department (IMD) Pune, from 1951 to 2018. To ensure consistency in spatial resolution, the temperature data with a grid resolution of 1<sup>o</sup> is resampled to a 0.25<sup>o</sup> resolution using the bilinear interpolation method. The bias-corrected CMIP6 dataset for future temperature for the time period 2015-2100 is obtained from 3 Global Climate Models (GCM’s) namely, CanESM5, NORESM2-MM and MPI-ESMI-2-HR. Each of them comprises four emission scenarios SSP126, SSP245, SSP370 and SSP585. 



<!-- Start of picture text -->
500.000 60.000<br>50.000<br>400.000<br>40.000<br>300.000<br>30.000<br>200.000<br>20.000<br>100.000<br>10.000<br>0.000 0.000<br>0 2 4 6 8 10 12 14<br>Streamflow Precipitation Mean Temperature<br><!-- End of picture text -->

Figure 3.2 Inner-annual cycle of the Streamflow, mean temperature and precipitation for the period 1981-2018 

### **3.2.3. Streamflow** 

The basin contains a total annual water potential of 28.48 BCM and has 18.30 BCM of water resources that can be utilized. Tanks account for 85.78% of the surface water bodies within the basin. The daily streamflow data (1980–2018) for the gauging stations, Tilga  and Anandapur for Brahmani and Baitarni basins respectively is obtained from India Water Resources Information System (WRIS). It is detected that the streamflow follows the precipitation pattern 

14 



<!-- Start of picture text -->
84°0'0"E 85°0'0"E 86°0'0"E 87°0'0"E = 84°0'0"E_ 85°0'0"E 86°0'0"E 87°0'0"E N<br>ms5 DEM z 2 = Or<br>5 = g s<br>g28g<br>z2 @ z<br>> > > 5<br>x ' e oS ©<br>z ee z 2 z<br>(a)<br>84°0'0"E 85°0'0"E 86°0'0"E 87°0'0"E = 84°0'0"E 85°0'0"E 86°0'0"E  87°0'0"E<br>DEM Soil<br>— High : 1190 | Sandy Loam | Loam<br>rer HME Sandy sendy Clay Clay LoamLoam I Claclay<br>0 55 110 220 330 440<br>———————EEEEEEes Ki<br><!-- End of picture text -->



<!-- Start of picture text -->
84° E 86° E 84° E 86° E 84° E 86° E<br>LULC 1985 LULC 1995 LULC 2005<br>N<br>Om<br>s<br>z zz zz z<br>= NN NN ES<br>(a) (b) (c)<br>84°E 86° E 84° E 86° E 84° E 86°E<br>LULC Maps<br>|| Water i Forest / Built-up =a Agriculture<br>0 60 120 240 360 480°<br>SS res Kilometers<br><!-- End of picture text -->



<!-- Start of picture text -->
84°0'0"E + 85°0'0"E 86°0'0"E 87°0'0"E 84°O'O"E 85°0'0"E 86°0'0"E 87°0'0"E<br>zl]Sb}So] oei >  AoRAS27%, Roads =>2 Birsy\z|../ >i‘ Railways |Z:5<br>22oba%es Jf ¢ z3 adz “Abi3Ae seer¢¢=<br>=OD ws, [2 = : x, [2<br>84°0'O"E 85°0'0"E 86°0'O"E 87°0'0"E 84°0'O"E 85°0'0"E 86°0'O"E 87°0'0"E<br>N<br>Roads and railways<br>Ww E<br>— Railways Ss<br>—— Roads<br>0 50 100 200 300 400<br>aees Kilometers<br><!-- End of picture text -->



<!-- Start of picture text -->
N<br>Spatial factors Om<br>85°0'0"E 87°0'0"E 85°0'0"E 87°0'0"E 85°0'0"E 87°0'0"E .<br>4& 25 zo| aioeSiri. z z z<br>Bo ra | .erea” ” é<br>w 8 A] Ses Q R Cel<br>5N ina §4 beN oeee ae| peN l=by<br>85°0'0"E B7°0'0"E 85°0'0"E —-87°0'0"E B85°0'0"E ——-87°0'0"E<br>Elevation (m) Aapett SIOPS<br>=r a ; High : 1.4321 Low :0<br>— ree High ; 360 Low : 6.2 ig<br>85°0'0"E 87°0'0"E 85°0'0"E 87°0'0"E 85°0'0"E 87°0'0"E<br>Fdz F4 2 2z Zzs z2<br>ga a & g a) 4 =<br>' z :+ z<br>S ° S 2 J oS<br>2 2 2 ea 5 aie<br>N |S N < N N<br>85°00"E  —«B7°0'0"E 8500"E | -87°00"E ee | AE<br>Population Density seg ae<br>Distance fromriver (m) (person per sq.km) Precipitation (mm)<br>| i = 8<br>High : 29301.9 Low :0 High : 5914 Low: 0 High : 132.4 Low: 107.4<br>(d) (e) (f}<br>85°0'0"E 87°0'0"E 85°0'0"E 87°0'0"E 85°0'0"E 87°0'0"E<br>z DP <% z ™ € 2<br>5 | at acs x 3 ae, fee = ° °<br>z 4 “AG ae Hage<br>>| SHAN 4 z z Pie oF z Zz 2<br>> Sie > ° eeaS a I's S S S<br>at ¥<br>N RikersS V. ae ~ ‘ee [oSN SN Boe,¥ % eg . |SN 5N S = 5Q<br>85°0'0"E 87°0'0"E 85°00"E 87 °0'0"E 85°0'0"E 87°0'0"E<br>Distance from road (m) Distanceistance from from BuiltBuilt-up (m) Distance from rail (m)<br>a BE a mm<br>High : 0.221715 Low: 0 High : 2193.17 Low : 0 High ; 0.360604 Low: 0<br>(g) (h) (i)<br>0 65 130 260 390 520<br>CN | es Kilometers<br><!-- End of picture text -->

# **CHAPTER 4** 

# **<mark>4. METHODOLOGY</mark>** 

## **4.1. General** 

The overall aim of the study is to analyse the individual and integrated impacts of climate change and LULC change on the watershed hydrology. Climate change analysis involves analysing various climate variables and climate change indices, to identify patterns and alterations in climate system. The analysis of climate change helps us understand how the climate is changing over time by studying long-term shifts in the climate variables. The changes in climatic patterns have direct implications for water availability within the catchment. In the present study, the impact of climate change on the hydrological variables is performed using correlation analysis of the observed data and through scenario analysis using hydrological simulation model. 

The effects  of LULC changes on the basin’s hydrology is evaluated by first analysing the changes in the LULC patterns within the catchment using the decadal land use maps. Analyzing changes in LULC over a specific period involves examining their spatial and temporal patterns by comparing historical and future LULC maps. The LULC maps of  the recent decades and the future period was developed using the remote sensing data and machine learning algorithms. Predicting future LULC maps requires utilizing historical maps and spatial variables to project changes that may occur in the future. In QGIS the MOLUSCE plugin was used to predict future LULC maps by training an ANN  and LR model and employing CA for the simulation. To evaluate the combined effects of land use  changes and climate on variations on the hydrological processes a hydrological model, SWAT, was employed. By considering different climate scenarios in the future and utilizing predicted LULC maps, the SWAT model can also predict future streamflow.The entire methodology for processing hydrometeorological data, analyzing LULC changes, calibrating and validating the SWAT model, is described in the subsequent sections. The overall methodology of this study is visually presented in Fig. 4.1, illustrating the flowchart of the entire process. 

19 



<!-- Start of picture text -->
LULC<br>Climate change analysis<br>scenarios<br>Historic<br>Historic Future period period<br>period period<br>LULC LULC<br>ns classification prediction<br>Meteorological<br>data<br>LULC change pT casas<br>i)<br>Climate“ detection 1<br>—— \i)<br>change indices | '<br>Trend Climate |!<br> and Sens SWAT data<br>slope test Loo -------!<br>pe<br>ae<br>Cort ' Sensitivity |<br>elation ! analysis<br>analysis with l-----2-----!<br>streamflow Calibration &<br>Validation in<br>SWAT-CUP<br>Assessment of individual and<br>combined effects of climate<br>change and LULC change<br><!-- End of picture text -->



<!-- Start of picture text -->
pT ene eeeet<br>' 1<br>NORESM MPI-ESMI- |_|<br>scenarios '<br>SSP 126,<br>and SSP585 scene’<br>' 1<br>bc nnnnsoocnnnnsnssapconsnnssacccocssssccccs<br>Meteorological data<br>Trend analysis<br>Correlation and cross-<br>correlation analysis with<br>streamflow<br><!-- End of picture text -->

Tmaxmean index is a climate index that represents the average maximum temperature for a specific location over a specified time period. Higher temperatures can also lead to changes in patterns of precipitation, such as less frequent and more intense rainfall events resulting in prolonged droughts, which can further impact streamflow. It is computed by taking the average of the maximum daily  temperature over a month, season, or year. The formula for Tmaxmean index is shown in equation 2: 



where, ΣTmax is the sum of daily maximum temperatures for the specified time period, n represents the number of days in the specified  period of time. 

##### **(iii) Tminmean** 

Tminmean is trend of minimum daily air temperature over a long-term period , specifically the average of the daily minimum temperatures over a specified period of time. The increasing Tminmean values indicate warming trends over time. The effect of Tminmean will be more in the regions with large snowpack. As Tminmean increases, it can lead to increased evapotranspiration rates, which can reduce streamflow by decreasing the amount of water available for runoff. It is computed by taking the average of the minimum daily temperature over a month, season, or year. The formula for Tminmean index is as shown in equation 3: 



where, ΣTmin is the sum of daily minimum temperatures for the specified time period, 

##### (iv) n represents the number of days in the specified period of time. **TX10P** 

TX10P represents the 10<sup>th</sup> percentile value of maximum temperature. It is significant because it provides insight into the lower end of the temperature distribution. If this value increases over time, it means that temperatures in the lower range of the distribution are getting warmer. It could lead to more frequent and intense heatwaves. The 10<sup>th</sup> percentile value of any dataset is calculated as shown in equation 4: 



22 

where, N represents the number of values in maximum temperature dataset. 

##### (v) **TX90P** 

TX90P represents the 90<sup>th</sup> percentile value of maximum temperature, which is significant because it provides insight into the upper end of the temperature distribution and is calculated using equation 5. If the 90<sup>th</sup> percentile value of maximum temperature increases over time, it means that temperatures in the higher range of the distribution are getting warmer. It could increase the risk of wild-fires and climate related hazards. 



where, N represents the number of values in maximum temperature dataset. 

##### **(vi) TN90P** 

The 90<sup>th</sup> percentile value of minimum temperature represents the temperature below which 90% of the observed temperatures fall and calculated using equation 6. It is thus a measure of the extreme cold events. As the Earth’s climate warms, extreme cold events are anticipated to become less intense and lessfrequent, and the 90<sup>th</sup> percentile value of minimum temperature is expected to increase over time. 



where, N represents the number of values in minimum temperature dataset. 

##### (vii) **TN10P:** 

The 10<sup>th</sup> percentile value of minimum temperature represents the temperature at which 10% of the observed minimum temperatures are lower than this value and calculated using equation 7. The minimum temperature can also impact the amount of water that evaporates from the land and water surfaces, which can affect the amount of water that is available for streamflow. Higher minimum temperatures can increase evaporation rates, resulting in less water available for streamflow. 



Where, N represents the number of values in minimum temperature dataset. 

23 

##### **(viii) Winter days (WD)** 

Winter days are calculated by counting  the number of days where the maximum temperature is below 20°C. This index is important in assessing the amount and arrival of streamflow, particularly in regions where snowmelt is a significant contributor to streamflow. 

##### **(ix) Summer days (SU)** 

Summer days is calculated by counting the total number of days in a given year where the maximum temperature is above 35°C. It indicates how often extreme heat events are occurring. With the increase in global temperatures, it is expected that there is an increase in both frequency and intensity of extreme heat events. By comparing SU values from different years, we can see how the extreme heat events will change frequently and how quickly it is changing. 

##### **(x) Heat waves (HW):** 

Heat waves is calculated by counting the number of days where the maximum temperature is above  40°C in a particular location. Heatwaves can exacerbate drought conditions and increase the likelihood of water scarcity, particularly in regions that are already water-stressed. Heatwaves can also impact water quality. 

##### (xi) **Total Precipitation (PRCPTOT):** 

PRCPTOT index measures the changes in total precipitation over a specified period of time. By comparing this index to the precipitation in subsequent periods, changes in precipitation patterns can be assessed. It is calculated by summing the precipitation totals for a specific period (monthly, seasonal or annual) and dividing the sum by the specified period. Let _<mark>RR</mark> ij_ <mark>be denoted as the  toatal precipitation amount on day i in the period j, if i is denoted as the number of days in the period j, then total precipitation is calculated as shown in equation 8.</mark> 



##### **(xii) Rainy days (RD):** 

Rainy days is the measure of number of days in which precipitation is more than 2.5 mm. <mark>Let</mark> _<mark>RR</mark> ij_ <mark>denotes the the total daily precipitation amount on the day i in the period</mark> _<mark>j,</mark>_ <mark>the rainy</mark> 

24 

<mark>days in the specific period will be the count of number of days where</mark> _<mark>RR</mark> ij_ > 2.5 mm (as per IMD). 

##### **(xiii) RX1Day:** 

<mark>If</mark> _<mark>RR</mark> ij_ <mark>is defined as  the daily precipitation amount on day</mark> _<mark>i</mark>_ <mark>in the period</mark> _<mark>j,</mark>_ <mark>then</mark> _<mark>Rx1day</mark> j_ <mark>= max (</mark> _<mark>RR</mark> ij_ <mark>) will give the maximum 1-day value for the period</mark> _<mark>j</mark>_ <mark>are .</mark> Rainy days increases the water availability in regions suffering with water scarcity. 

##### **(xiv) Dry days (DD):** 

By counting the number of  days in the specific period, in which rainfall is below 1 mm, Dry days are computed. <mark>If</mark> _<mark>RR</mark> ij_ <mark>is defined as  the daily precipitation amount on the day</mark> _<mark>i</mark>_ <mark>and in the period</mark> _<mark>j,</mark>_ <mark>count the number of days where</mark> _<mark>RR</mark> ij_ < 1mm. Increase in dry days could increase the drought occurrence in drought prone areas. 

##### **(xv) R95P:** 

- **4.2.2.** **<mark>Let</mark>** **_<mark>RR</mark> ij_** **<mark>be the daily precipitation amount on day</mark>** **_<mark>i</mark>_** **<mark>in period</mark>** **_<mark>j</mark>_ .R95P is calculated as the total precipitation where** **_<mark>RR</mark> ij_** **<mark>></mark> 95**<sup>**th**</sup> **percentile. It is the amount of rainfall that is exceeded only by the heaviest 5% of rainfall events. An increase in the 95**<sup>**th**</sup> **percentile of rainfall indicates the increase in the occurrence and intensity of the  extreme rainfall events Trend analysis** 

##### **4.2.2.1. Mann-Kendall test** 

In this study, the Mann-Kendall test is a statistical method used to analyse the trend in climate change indices and meteorological data. This test is a non-parametric test and it has a test statistic _S_ ., For a time-series _<mark>x</mark>_ 1 <mark>,</mark> _<mark>x</mark>_ 2 <mark>,…,</mark> _<mark>x</mark>_ n <mark>of length n, the indicator function s</mark> gn(𝑥𝑗 −𝑥𝑖) is calculated as shown in equation 9: 



<!-- Start of picture text -->
1,             (𝑥𝑗 −𝑥𝑖) > 0<br>0,             (𝑥𝑗 −𝑥𝑖)  = 0<br>−1,            (𝑥𝑗 −𝑥𝑖) < 0<br><!-- End of picture text -->



25 

<mark>which examines  the difference between the measurements at different times</mark> _i_ <mark>and</mark> _<mark>j</mark>_ <mark>to determine whether theyare positive, negative or zero.</mark> The mean of test statistic E[S] is calculated as shown in equation 10: 



variance is computedusing equation 11: 



where xi and xj are represented as the sequential data values of observed time series while i < j, p denotesthe presence of <mark>f tie groups in the data, with</mark> _<mark>q</mark> k_ <mark>representing  the number of data points in the</mark> _<mark>k</mark>_<sup>_th_</sup> <mark>tie group.</mark> Based on mean and variance of the S statistic, static value Z of the Mann-Kendall test, which is assumed to follow normal distribution is calculated using equation 12: 



<!-- Start of picture text -->
𝐸[𝑆]  −1<br>,           𝐸[𝑆]  > 0<br>ඥ𝑉𝑎𝑟(𝑠)<br>0,                         𝐸[𝑆]   = 0<br>𝐸[𝑆]  + 1<br>,          𝐸[𝑆]  < 0<br>ඥ𝑉𝑎𝑟(𝑠)<br><!-- End of picture text -->



This test is performed at 5% significance level, for which |Z|>=1.96 represent significant trend. 

##### **4.2.2.4. Sen’s slope:** 

Sen’s slope is one of the non-parametric methods utilized in analysing the trends over longterm period to determine magnitude and direction of a monotonic trend over time. To calculate Sen’s slope, all possible pairwise slopes between observations in the dataset are computed, and then the median of these slopes is taken. The pairwise slopes are computed by dividing the difference between two observations by the difference between their corresponding time 

26 

periods. The resulting median value represents the magnitude and direction of the trend. Sens slope (σ ) is calculated using equation 13. 



The main advantage of Sen’s slope over other trend analysis methods is its robustness to outliers, as well as its lack of dependence on any particular data distribution. Sen’s slope can be applied to datasets of any size, and its results are easily interpretable as the average rate of change over time. 

### **4.2.3. Correlation analysis** 

Correlation between climate indices and streamflow is calculated, that gives an  understanding of the individual impacts of changing climate on streamflow variability, assuming that the climate change is the sole driver of the observed changes in streamflow. Pearson Correlation coefficient, a linear measure between two variables (climate indices and streamflow), is calculated using equation 14: 



where, r is the Pearson’s correlation coefficient, n represent sthe total number of data pairs, sum of the products of the corresponding values of X and Y is denoted as ΣXY, are the sums of the values of X and Y, respectively are denoted as ΣX and ΣY  and are the sums of the squares of the values of X and Y are denoted as ΣX<sup>2</sup> and ΣY<sup>2</sup> , respectively. 

### **4.2.4. Cross-correlation analysis** 

Identification of lag relationships is obtained between the time series of streamflow and other climate indices, which is a frequent application of cross-correlation analysis. The crosscorrelation coefficient is calculated between streamflow and climate indices by lagging streamflow up-to 3 lags. It was observed through the following equations: 

Cross-correlation between the sets of  { _Xi_ } and { _Xj_ } is defined as the ratio of their covariance to respective square root of mean variance as shown in equation 15, 

27 



Sample covariance is computed using equation 16, 



Similarly, sample cross-correlation is calculated as  shown in equation 17, 

## **4.3. LULC change analysis** 

The remote sensing techniques and GIS tools facilitate the LULC change detection anlysis. The decadal LULC maps for the historical years 1985, 1995, and 2005 are obtained from NASA (Roy et al., 2016). The recent LULC maps of the years 2007, 2014 and 2021 were processed with the help of the LANDSAT 7 and 8 images. Supervised classification techniques were employed to classify the maps, and changes in LULC are detected by comparing different classes of two images and calculating the differences in their areas. Fig. 4.3 presents a flowchart that outlines the steps followed in the data collection and analysis process of LULC change. 

### **4.3.1. Image pre-processing** 

Image pre-processing plays a crucial role in different image processing applications, as it can significantly improve the accuracy and reliability of subsequent analysis. For LULC mapping for the year 2007, Landsat 7 Enhanced Thematic Mapper + (ETM+) Level1 Surface Reflectance images were obtained with less than 10% cloud cover for all bands. These preprocessing of images was performed  using the GEE platform, including radiometric corrections, cloud masking, and gap-filling techniques. Statistical measures like mean and standard deviation were used to determine primary and secondary scaling factors. Landsat 8 Collection 2 Tier 1 and Realtime (RT) images were downloaded for LULC mapping of 2014 

28 



<!-- Start of picture text -->
Landsat 7 & 8 Images Spatial factors<br>! I<br>I<br>leanne peneiaieeneieeaa Distance from . 1<br>i 1 . . Population !<br>Image I river, road, built- Densi '<br> pre-processing, ; up and rail ensity<br>Training sites<br>!! 1<br>Supervised classification '<br>(RF, SVM& CART) woes pO<br>2007 (QGIS)<br>LULC classified maps 2014 a San<br>I I<br>2021 7 \<br>Change Detection (1985-2021)<br>Transition matrix<br>(2007 & 2014)<br>Simulated LULC map<br>2021 and validation<br>with actual 2021 map<br>LULC predicted maps<br>(2028, 2035, 2056 and<br>2070<br><!-- End of picture text -->

Table 4.1: Description of Satellite imagery and different bands used for LULC classification for deriving the LULC maps of 2007, 2014 and 2021 

|**Satellite**<br>**Imagery**|**Year**|**Spatial**<br>**Resolution**|**Bands used for training**|
|---|---|---|---|
|Landsat 7 ETM+|2007|30m|B1(0.45 - 0.52 µm), B2 (0.52 - 0.60 µm),<br>B3 (0.63 - 0.69 µm) B4 (0.77 - 0.90 µm),<br>B5 (1.55 - 1.75 µm)|
|Landsat 8 OLI|2014|30m|B2(0.45-0.51 µm), B3(0.53-0.59 µm),<br>B4(0.64-0.67 µm), B5 (0.85-0.88 µm)<br>B6(1.57-1.65 µm)|
|Landsat 8 OLI|2021|30m|B2(0.45-0.51 µm), B3(0.53-0.59 µm),<br>B4(0.64-0.67 µm), B5 (0.85-0.88 µm)<br>B6(1.57-1.65 µm)|



### **4.3.2. LULC classification** 

The LULC classification was performed using supervised classification techniques that are efficient in LULC classification. The three different Machine Learning algorithms adopted for the study were, Random Forest (RF),  Classification and regression trees (CART) and Support Vector Machine (SVM). These machine learning algorithms have their own approach in handling data and parameter optimization, therefore there is a need to compare and evaluate them in the LULC prediction. 

**Random Forest (RF):** The Random Forest algorithm is extensively utilized in machine learning for classification tasks, including the classification of  LULC(Talukdar et al., 2020a). This algorithm employs decision trees to classify pixels or regions of an image into various LULC categories. To minimize overfitting and enhance the accuracy of the classification, each decision tree is created using a random subset of the input features and a random subset of the training data that is available and (Feizizadeh et al., 2023b). Each decision tree assigns a class labels to  pixels or regions based on their spectral properties and other available features. By combining the predictions of all the decision trees, the final result of classification is obtained. Random Forest is often used together with other pre-processing methods like dimensionality reduction and feature selection to improve the classification accuracy and efficiency. 

30 

**Support Vector Machine (SVM):** Support Vector machine (SVM) is employed in this analysis due to its ability to classify non-linear boundaries. The SVM's primary goal is to maximize the distance between hyperplane and support vectors. The configuration of kernel plays a crucial role in the functioning of SVM as it transforms the input data to high dimensional space and generates linear boundaries to separate the classes (Talukdar et al., 2020b). In this analysis we have used RBF as the kernel with gamma and cost as the parameters. 

**Classification and regression trees (CART):** The CART algorithm is also a decision treebased technique that uses a hierarchical structure of nodes to partition the data into subsets based on one or more input variables. CART works by splitting the data recursively into smaller subsets based on input variables, until the subsets are homogeneous enough to be assigned to a specific LULC class. As per the studies, minimum node size, maximum tree depth, splitting criteria, and pruning methods are the sensitive parameters of CART algorithm (Denison et al., 1998). 

The obtained pre-processed images were classified into four distinct LULC classes i.e., water, forest, built-up, and agriculture using the above-mentioned algorithms in GEE platform. The training sample size for each class should not be lesser than 10–30 times the number of bands (Van Niel et al., 2005). Table 4.2 displays the number of training samples taken for each LULC class.  Bands used for training the data are as per Table 4.1. The classification process employed a total of 61,694,493 pixels, for each of the algorithm, training to validation ratio of 70:30 was used while generating the maps. The accuracy assessment and confusion matrix of the three techniques are calculated for evaluation of the better algorithm. 

Table 4.2: Description of the LULC classes considered for the present study and number of training sites given for each class during the LULC classification 

|**LULC class**|**Training sites**|**Description**|
|---|---|---|
|Water|145|Natural or artificial water bodies, rivers, streams,|
|||lakes, reservoirs and wetlands.|
|Forest|175|Land characterized by dense trees and closed|
|||canopy.|



31 

|Built-up|125|Used for residential, commercial, industrial, or|
|---|---|---|
|||transportation purposes. This category includes<br>areas with buildings, roads, and other man-made<br>structures.|
|Agriculture|200|Land used primarily for the production of crops,<br>livestock, or other agricultural products. This<br>category includes cropland, pastureland, and<br>orchards.|



### **4.3.3. Accuracy assessment and confusion matrix** 

Assessing the accuracy of machine learning algorithms is a critical aspect of evaluating their performance. By comparing the predicted LULC classes with the actual land cover types, the accuracy of the derived LULC maps of the years 2007, 2014, and 2021 was evaluated. Various statistical methods like kappa coefficient, overall accuracy, and confusion matrix were used for this assessment. A confusion matrix is a tool that presents the classification results in a tabular format, allowing for a clear visualization of the algorithm's errors. The matrix summarizes the total number of samples that were classified correctly and those that were misclassified for each class. The confusion matrix consists of rows for predicted classes and columns for actual land cover types. The diagonal elements of the matrix indicate the number of pixels that were correctly classified (True Positive, TP), while the off-diagonal elements represent the incorrectly classified pixels (False Positive (FP) and False Negative (FN)). Spatial statistical metrics such as user’s accuracy (UA), producer’s accuracy (PA), , kappa coefficient and overall accuracy (OA),  are used to measure the accuracy of LULC maps. 

The diagonal elements of the matrix represent the number of pixels that were correctly classified (True Positive, TP), while the off-diagonal elements represent the incorrectly classified pixels (False Positive, FP, and False Negative, FN). Spatial statistical metrics such as producer's accuracy (PA), user's accuracy (UA), overall accuracy (OA), and kappa coefficient are commonly used to measure the accuracy of the Land Use and Land Cover 

32 

(LULC) map. These metrics provide quantitative assessments of the accuracy of the classification results. 

Producer’s accuracy is a measure of the percentage of the pixels that are classified correctly based on the reference data, while UA is based on the interpretation of the user. PA assesses the ability of the classification algorithm or method to accurately classify the different LULC classes. In contrast, UA measures the ability of the LULC map to correctly represent the ground conditions. Overall accuracy, on the other hand, measures the percentage of all correctly classified pixels by the algorithm out of all the pixels. Kappa coefficient is a statistical measure used for assessing the agreement between the predicted land cover classes and actual land cover classes in a confusion matrix. It is a valuable measure for multi-class classification problems, and it ranges from -1 to 1, with a value of 1 indicating perfect agreement and a value of 0 indicating agreement due to chance alone (Cohen, 1960). The expressions for each of the metrics are given in Eq. 18 to 21, 





where, Po is the observed agreement proportion and Pe is agreement proportion expected by chance. 

### **4.3.4. Historic LULC change analysis** 

Decadal LULC change analysis is performed for the period of 1985 to 2021. LULC maps for the years 1985,1995, 2005 (NASA EARTH DATA), 2007, 2014 and 2021 (LANDSAT-7 & 8) were considered for the historical LULC change analysis. LULC changes are identified by reclassifying LULC maps into four different LULC classes (Water, Forest, Built-up and Agricultural land,) and comparing their respective areas. All LULC maps are resampled to same resolution (100m x 100m) for the homogeneity of the data. 

33 

### **4.3.5. Prediction of future LULC maps** 

The future LULC predictions were performed using an integrated approach combining artificial neural networks (ANN)/logistic regression (LR), Markov chain and cellular automata (CA) models. The data required for the prediction are historical LULC maps and other spatial variables such as DEM, Distance from roads, Slope, Population density, Distance from Builtup, Aspect, Precipitation, Distance from river and Distance from rail. The future LULC prediction is performed using  MOLUCSE plugin in QGIS. 

##### **4.3.5.1 MOLUCSE plugin** 

The Modules for Land Use Change Simulations (MOLUSCE) plugin in QGIS was employed in predicting alterations in LULC for the study area. This plugin features a user-friendly interface with fundamental components, including input variables, analysis of changes in area , transition potential modelling, simulation, and validation. Nine spatial factors were included, and their correlation was examined using the Pearson’s correlation coefficient. To evaluate the best combinations of spatial variables, a sensitivity analysis was conducted using Kappa coefficient. For the transition potential modelling in MOLUCSE, the ANN and LR models were preferred owing to their superior computing efficiency.  The ANN model is a non-linear algorithm that trains the spatial factors  and considers complex relations during modelling. It generates a map of transition probability using input layers, hidden, and output layers, which together form a multilayer perceptron (MLP). In a feed-forward network neurons are trained by the weighted input neuron, and propagating the associated error using the backpropagation technique . The Markov chain model can be used to estimate the transition probabilities between different land cover classes based on their historical occurrences. These probabilities can then be used to generate future land cover maps or scenarios. However, it is assumed that probability of transitions are constant over time and do not change with changing environmental conditions or land management practices in the Markov model. The basic formula for first-order Markov chain model in LULC is calculated using equation 20, 



where, P(i → j) is the transition probability  from LULC class i to j, P(j|i) is the conditional transition probability from class i to j, n(j|i) is the number of times the transition from class i to class j occurred in the historical data, Σn(j|i) is the total number of transitions from class i to all other classes. 

34 

The cellular automata (CA) approach is based on the concept of local interactions between neighbouring cells, where each cell represents a land unit, and state of the current cell depends on the states of its adjacent cells. The basic formula for a simple CA model in LULC as per equation 21, 



where, LC(t+1)[i,j] represents the LULC class at cell (i,j) at time t+1, LC(t)[i,j] represents LULC class at cell (i,j) at time t, f is a transition function that determines the probability of transitioning from one LULC class to another based on the current LULC at the cell and the neighbouring LULC, and N[i,j] represents the neighbouring cells around cell (i,j). 

By integrating ANN/LR, CA, and Markov chain models, a more comprehensive and accurate approach for predicting future LULC patterns can be achieved. In this study, the input maps from 2007 and 2014 were analyzed by classifying and re-projecting them in QGIS MOLUSCE Plugin. Nine spatial factors were included, and their correlation was examined using the Pearson correlation coefficient. Out of 9, most sensitive factors were selected as inputs to the ANN and LR model to predict the likelihood of transitions between LULC classes. The output of the ANN and LR is a set of transition probabilities for each LULC class, which are then used by the CA model to simulate the spatiotemporal dynamics of LULC change over time. The predictions by CA-ANN model were also compared with that of CA-LR which was available under MOLUSCE in QGIS. It is a relatively simple statistical model. In the context of LULC classification using logistic regression, the parameters refer to the coefficients that are estimated to predict the probability of a pixel belonging to a specific LULC class. The LR model assumes that the log odds of a pixel belonging to a certain land cover class is a linear function of the predictor variables, such as terrain features (DEM, Slope), climate data, and socioeconomic data. It is useful when the relationship between the predictor variables and the outcome variable is linear or can be approximated by a linear function unlike ANN, which considers the non-linear relationship between the two. The LR model can then be used to estimate the probability of a pixel belonging to a certain land cover class based on its spectral characteristics, and this probability can be used as an input to the CA model. The CA model can simulate the spatiotemporal dynamics of LULC change based on the estimated probabilities from the LR model. 

To ensure the reliability of the LULC forecast, it is necessary to verify it using the corresponding LULC classes. Therefore, a validation was performed using the MOLUSCE 

35 

plugin, comparing the actual LULC of 2021 with a simulated LULC of 2021 generated using CA-ANN and CA-LR models. The validation module calculates four kappa statistic metrics, including kappa histogram, overall kappa, kappa location, and percentage of correctness, to evaluate the accuracy of the model as shown in equations 22-23, 



where, 𝑃𝑜 = observed proportion of agreement,  𝑃𝑒 = proportion expected by chance. 

The future LULC maps were predicted for years 2028, 2035, 2056 and 2070. Note that these years were random choice. The area changes between historic and future maps are then calculated. The conversion of one class to other class depends on transition matrix, which is calculated based on initial and final LULC maps. Future LULC change analysis is also performed similar to the historical analysis. 

## **4.4. Hydrological Modelling** 

The combined and isolated impacts of the climate change and LULC change on the hydrology of the basin was analysed using SWAT hydrological model. The spatial factors such as DEM, Soil, LULC, and Climate variables were given as input and the streamflow was considered as the output. The detailed description about the model and model setup is discussed in the following sub-sections. 

### **4.4.1. Soil and Water Assessment Tool (SWAT) model** 

The SWAT is a widely used hydrological model for simulating the impacts of land use, climate, and management practices on water quality and quantity within the catchment . To estimate runoff at the Hydrological Response Unit (HRU) level, the SWAT model utilizes the Soil Conservation Service (SCS)-Curve number method, and subsequently applies the variable storage routing method to route the runoff from sub-basins to outlet, obtaining the overall streamflow for the entire watershed. The model output includes various hydrological and water quality variables, such as streamflow, sediment yield, nutrient loadings, and crop yields. The SWAT model is often used for various applications, including watershed management, land use planning, climate change impact assessment, and water quality management. 

36 



<!-- Start of picture text -->
Input data<br>ASTER LULC maps Soil data Weather data<br>Reclassified LULC Write input<br>maps FAO soil map data files<br>i}<br>Watershed Overlay of LULC, Soil and SI |<br>Delineation verlayo , Soil and Slope maps |<br>’|<br>|<br>HRU Analysis<br>re | Tee |<br>Historic > | Future climate &<br>| Climate data LULC data to<br>t------------= wennnnert|<br>Run SWAT<br>Calibration & Validation<br>in SWAT-CUP<br>Assessment of climate and<br>LULC impacts in both<br>historic and future period<br><!-- End of picture text -->

### **4.4.3. Calibration and Validation of SWAT model** 

The time period considered for the study is divided into four consecutive time periods, each spanning 10 years (except fourth decade) as 1981-1990, 1991-2000, 2001-2010 and 20112017, to evaluate the possible effects of past climate change and LULC changes on streamflow variability over a decade. It is to note that for the last period, i.e., 2011-2017, the shortened period was used due to the non-availability of the streamflow at the gauging sites post 2017 year. Four different SWAT models (M1, M2, M3 and M4) are setup as base models using four different LULC maps. The calibration and validation of the SWAT models were conducted for four distinct time periods. In the SWAT-CUP interface, SUFI-2 algorithm was used to calibrate the four models on daily scale for the historic period. The description of all the four SWAT models for different climate and LULC scenarios is shown in Table 4.3. The fine tuning of the SWAT model parameters for the streamflow, in which t-test gives the information of relative importance of each parameter and p-value gives the significance of sensitivity. A p-value close to zero and a high value of the t-test indicate that the parameter shows higher sensitivity. (Abbaspour et al., 2009). For the first three models, two years are considered for warm-up period and 5 years for calibration and 3 years for validation. For the fourth model, 2 year is given as warm-up year and 4 years as calibration period and 2 years as validation period. 

Table 4.3 Description of the SWAT models that are categorized based on different sets of climate and LULC information. 

|**Model**<br>**Notation**|**Climate**|**Land use**|**Streamflow**<br>**period**|
|---|---|---|---|
|C1L1|C1<br>(1981-1990)|L1<br>1985|(1981-1990)|
|C2L2|C2<br>(1991-2000)|L2<br>1995|(1991-2000)|
|C3L3|C3<br>(2001-2010)|L3<br>2005|(2001-2010)|
|C4L4|C4<br>(2011-2017)|L4<br>2014|(2011-2017)|



### **4.4.4. Performance of SWAT model** 

During calibration and validation of the SWAT model, the efficiency of the model parameters was assessed using three evaluation metrics such as  Nash-Sutcliffe efficiency (NSE), and 

38 

percentage of bias (PBIAS), and coefficient of determination (R<sup>2</sup> ) as per equations 23-26 during calibration and validation of the model. The NSE measures the relative proportion of residual variance compared to the variance in the observed data and ranges from -∞ to 1. PBIAS indicates the overall error made relative to the measured  data. It helps to evaluate whether the model exhibits a bias of overestimation or underestimation. The R<sup>2</sup> indicates the  the proportion of variance  in the observed data that can be explained by the model. The value of R<sup>2</sup> from  0 to  1. 







where, 𝑄𝑜𝑏𝑠 is the observed streamflow, 𝑄𝑜𝑏𝑠 is the  observed mean streamflow, 𝑄𝑠𝑖𝑚 is the simulated flow, 𝑄𝑠𝑖𝑚 is the simulated mean streamflow. Based on the performance of four SWAT models, 12 scenarios are developed with different LULC classes and climate combinations to evaluate the relative effects of climate and LULC dynamics  (Fig. 4.5). The individual effects of climate change and LULC alterations are evaluated using SWAT model scenarios using the framework developed by (Swain et al., 2021a)as shown in Eq. 27-31. These scenarios were designed such as for each land use,  the climate in each decade was forced through the model . The change in the streamflow for a particular decade was analysed by assuming the preceding decade as the baseline condition. For instance, the change in the 19912000 decade due to climate and land use was assessed by considering 1981-1990 as the baseline condition, and the change in the 2001-2010 decade was compared against the 1991-2000 decade. 

39 









### **4.4.5. Assessing combined impacts of climate and LULC change on historic and future streamflow** 

The future projections of the streamflow changes due to the future climate change and LULC changes is assessed by considering the output of 1 GCM model under 4 emission scenarios and two LULC maps. The GCM data and LULC maps were forced through the calibrated SWAT model, which was setup for 1981-2017 period. To simplify the analysis and selection of the GCM, data pertaining to 3 GCMs for the historic period was forced through the SWAT model and the simulated flow performance was assessed. The integrated impacts of LULC change and climate change in future are assessed using models M5 and M6 as shown in Table 4.4. 

Table 4.4: Description of SWAT model scenarios for the near future period  (2021-2050) and far future (2051-2090) 

|**Model**|**Climate**|**Scenarios**|**Land use**|
|---|---|---|---|
|||S1||
|M5|C1|S2|L1|
||(2021-2050)|S3|(2035)|
|||S4||
|||S1||
|M6|C2|S2|L2|
||(2051-2090)|S3|(2070)|
|||S4||



To assess the integrated effects of both climate and LULC alterations in both historic and future periods, two models are setup with different climate data and LULC classes. M7 model is calibrated for the historic period (1981-2017). The model M8 is developed for the future using the best fitted parameters of the model that is calibrated for the historic period climate data (1981-2018) and LULC map (2005). The M8 model is forced with future climate data of the best performing GCM considering the moderate and high emission scenarios i.e., SSP245 and SSP 585. Thus, the M8 model includes two more scenarios S1L2 and S2L2. The M8-M7 (S1L2-M7) and (S2L2-M7) gives the integrated impacts of climate and LULC changes on streamflow by observing the mean monthly changes in the streamflow over the different scenarios. 

41 

Table 4.5. Description of SWAT model scenarios for the historic (1981-2017) and near future period (2025-2050) 

|**Model**|**Climate**|**Land use**|**Stream flow**|
|---|---|---|---|
|M7|C1<br>(1981-2017)|L1<br>(2005)|(1981-2017)|
|M8|C2<br>(2025-2050)|L2<br>(2035)|(2020-2050)|



42 



<!-- Start of picture text -->
84°E 85°E 86°E 87°E 84°E 85°E 86°E 87°E<br>= aly<br>FN | Pr &z -|]2]N feeBiase Tmax | RN2<br>= elaha ala<br>2 : -| Seay<br>8 P 3 HA =<br>a a a fe ees oy g<br>Eanaae<br>- = - Galle fetag :<br>2 3 : 1 A 2<br>N N N Leet a | | a N<br>a Bee<br>84°E 85°E 86°E 87°E 84°E 85°E 86°E 87°E<br>84°E 85°E 86°E 87°E N<br>z P Ww. E<br>g Tmin | zg O‘<br>= z [ Insignificant decreasing trend<br>x 8 | Significant decreasing trend<br>z Ps [| Significant increasing trend<br>N N [| Insignificant increasing trend<br>see° 68S© E 68 E 87° E eS0 55 110 220—330 een440Kilometers<br><!-- End of picture text -->

## **5.2. Trend in Climate indices** 

In this study, fifteen indices of the total twenty-seven ETCCDI indices, which are applicable for the considered study area were analyzed for trend in the historic and future time periods. Among the fifteen indices, 5 indices were corresponding to precipitation data, while 10 indices correspond to the temperature data. In general, it was observed that there is significant increase in trend in indices related to maximum temperature in southern parts of the basin and there is a significant decrease in trend in minimum temperature indices in north-western part of the basin. In precipitation indices there is a significant decrease in trend in the northern part of the basin, which resulted in the more number of dry days. The results of the specific indices are discussed in the following sub-sections. 

### **5.2.1. Temperature related indices in historical period** 

The results of trend analysis of all the temperature indices within the study area is shown in Fig. 5.2(a) to 5.2(j). In the entire catchment, over the past 68 years (1951-2018), DTR is increasing at a rate of 0.12/year, as maximum temperature is increasing and minimum temperature is decreasing over the basin. The entire basin is experiencing the increase in annual mean maximum temperature (Tmaxmean) at a rate of 0.009 ⁰C/year. It is to note that while entire basin showed increasing trend, the northern regions showed insignificant increase, whereas the central and southern region showed significant trend for the Tmaxmean. On the other hand, the mean minimum temperature is in general decreasing at a rate of 0.0035 ⁰C/year, however, most of the basin was observed to have insignificant trend. The extreme climate indices such as 90<sup>th</sup> percentile maximum temperature, 10<sup>th</sup> percentile minimum temperature, heat waves, and winter days showed insignificant trend in the entire basin. Similarly, number of summer days in the basin also showed insignificant trend except in some parts of southern region, where it showed significant increasing trend at a rate of 0.2/year. It is also observed that the grids showing increased summer days, were also have increased total precipitation and increased intensity of the rainfall. 

44 



<!-- Start of picture text -->
84° E 86° E 84°E. 86°E. 84° E 86° E 84° E 86° E 84° E 86° E N<br>» oo DTR opp Maxmean TMinmean wv .<br>| i faece a] »a Te [cn 7 TX10P Tx90P<br>noon = A SSeS s<br>= sma ao => z| eee i Beeeocs<br>2 Ee ie a o iS Leolan)sfen| | 2. = zz a Zz z<br>x DoonBESooo ag BoocosSooooo Neg N ¢g Besse)|. Neay éy<br>[oa Ha SaooeS) oo eeee<br>MSC SM jaan a | | a aigieie oo<br>(a) ——_ a Siaeiatatet1<br>(b) (c) (d) © Coo (e)<br>84° E 86° E 84°E 86° E 84°E 86°E 84° E 86° E 84°E 86°E<br>84°E 86° E 84°E 86°E 84° E 86° E 84°E 86° E 84° E 86° E<br>TN10P TN9OP _ SU HW<br>cal<br>z [nsafof<br>. z= = = =| "Ee Zz z<br>iin N& RA) Foe yaa R<br>1<br>aee<br>Me SEE EEE<br>(g) (h) (i) (i)<br>84° E 86° E 84° E 86° E 84° E 86° E 84°E 86° E 84° E 86° E<br>84°E 86°E 84°E 86°E 84° E 86° E 84°E 86° E 84°E 86° E<br>PRCPTOT RD oo DD ry RX1daly R95P<br>(ia= aeanafee = ie2<br>z oH os<br>g zz z=] See aa Po 2 = =<br>a qg ga maceke ag a a8 Be<br>CCT tea fa<br>Lo [ms [nf fn<br>; aoe “EE Se ere<br>) !) (m) (n) (0)<br>84° E 86° E 84° E 86° E 84° E 86° E 84° E 86° E 84° E 86°E<br>i Insignificant decreasing trend Insignifi increasing trend<br>aresG5 750 aa 570 760 Ki) omjeters [|[| =insignitica—_cieenineceaanig5  Indig [|[| Significantnsignt icantincreasing trend in Ing<br><!-- End of picture text -->

### **5.2.2. Precipitation related indices in historical period** 

The trend analysis results of all the precipitation indices in different grids within the study area is shown in Fig. 5.2(k) to 5.2(o). In the entire catchment, over the past 118 years (1901-2018), PRCPTOT, which corresponds to the spatial average total precipitation, decreased by -0.0928 mm/year showing that the precipitation is decreasing within the basin. However, on comparison of the spatial trend analysis, it was observed that the north-western region showed decreasing trend at a rate of 0.81 mm/year, while few grids in the southern region showed increasing trend at a rate of 1.76 mm/year. A similar trend was observed for the number of rainy days as well, with north western region showing decreasing trend at the rate of 0.107/year. It is to note that the grids, where the PRCPTOT was observed to be increasing, the RD showed insignificant trend, thus suggesting these grids might be experiencing more intense rainfall events. The majority of the basin show DD to be significantly increasing at a rate of 0.126/year, which is consistent with the results of PRCPTOT and RD. However, the few grids showed significant increasing trend but they do not align with the PRCPTOT grids, thus suggesting that more areas are receiving more intense rainfall. The majority of the basin showed significant decreasing trend for the 95<sup>th</sup> percentile of the precipitation, decreasing at a rate of 0.035 mm/year. In the grids that showed increase in the PRCPTOT also were observed to have increasing trend in R95P. 

### **5.3. Relations Between Streamflow and Extreme Climate Indices** 

### **5.3.1. Annual time scale results of correlation analysis** 

The relationship between variability of the streamflow and the extreme climate indices was investigated using the long-term observed dataset from 1981-2017. It is to note that analysis was performed for two different streamflow gauging stations, one in Brahmani basin and the other in Baitarni basin. The climate data for the Brahmani and the Baitarni basin were spatially averaged, which was used to estimate the extreme climate indices separately for both the basins. The linear relationship between the basin averaged climate indices with the streamflow at the outlet was analysed using Pearson’s correlation coefficient. The relationship was analysed at different temporal scales i.e., annual, monthly and seasonal. The interrelationship between the climate indices and its impact on the streamflow variability was not considered in this study. In general, it was observed that the precipitation indices show positive correlation to the streamflow, while the maximum temperature indices show negative correlation. 

46 

The correlation between the annual climate indices and the annual average streamflow for both the basins is shown in Fig.5.3. It can be observed from the Figure, that in Baitarni basin some of the temperature indices DTR (p < 0.01), TX10P (p < 0.05), Tmaxmean (p < 0.01) and Tminmean (p < 0.05) are significantly negatively correlated to streamflow. Similarly, in Brahmani basin, the temperature indices DTR, TX10P, SU, Tmaxmean (p < 0.01) are negatively correlated to streamflow. It was observed that the PRCPTOT, RX1Day and R95P were more strongly correlated to streamflow in Baitarni basin as compared to Brahmani basin, plausible due to smaller size of the Baitarni catchment. It is also observed that the RX1Day and R95P had very less correlation with streamflow in the Brahmani basin. On the other hand, the number of rainy days and number of dry days was observed to be higher correlated in the Brahmani basin as compared to the Baitarni basin. 



<!-- Start of picture text -->
Correlation of climate indices with streamflow (Annual)<br>0.8<br>0.6<br>0.4<br>0.2<br>0<br>-0.2<br>-0.4<br>-0.6<br>Brahmani Baitarni<br>DTR Tmaxmean Tminmean TX10P TX90P TN10P TN90P WD SU HW PRCPTOT RD DD RX1Day R95P<br><!-- End of picture text -->

Figure 5.3  Correlation   analysis performed between climate change indices and streamflow 

in Brahmani and Baitarni basins at the annual time scale for the period 1981-2018 

47 

### **5.3.2. Seasonal results of correlation analysis** 

The correlation between the selected 15 climate indices with the streamflow was also analysed at the seasonal time scale to understand the inter-seasonal variation. As per the IMD classification, four seasons were considered namely: Indian Summer Monsoon (ISM), Premonsoon, Post-monsoon and winter for the months June to September, March to May, October to November and December to February respectively. The correlation coefficient for the four different seasons in both the basins with the average streamflow is shown in Fig. 5.4 and Fig. 5.5 respectively. In the Brahmani basin, streamflow has significant positive correlation with PCPTOT, RD and R95P in all seasons (p < 0.01) and DD show significant negative relation with streamflow (p < 0.05). For the extreme temperature indices, DTR, TX10P, TX90P show significant negative relation with streamflow in all seasons, whereas TN10P and TN90P show significant positive relation with streamflow only in winter and post monsoon seasons. The plausible reason for positive correlation of the minimum temperature indices with streamflow during the winter and post monsoon months is that the temperature reduces in the post monsoon and winter months while the streamflow also reduces as the rainfall input recedes. Thus, the positive correlation between the minimum temperature indices in few seasons may not be the causal factor for reduction in streamflow. The SU show significant negative relation with streamflow in summer and monsoon. Also, WD show significant negative relation with streamflow in monsoon and post monsoon. Further it is also observed that the correlation between the PRCPTOT and rainy days with the streamflow is high for the post monsoon and winter months. In the Baitarni basin, streamflow has significant positive correlation with PRCPTOT, RD in all seasons (p < 0.01), whereas R95P and RX1day also has significant positive correlation with streamflow (p < 0.01) in all seasons except summer. Dry days have significant negative relation with streamflow in summer and winter. In the context of temperature indices, DTR, TX10P and TX90P show significant negative relation with streamflow (p < 0.01) in all seasons. Similar to Brahmani basin, TN10P and TN90P show significant positive relation with streamflow in winter and post-monsoon seasons at 5% significance level in the Baitarni basin. 

48 



<!-- Start of picture text -->
Brahmani<br>0.800<br>0.600<br>0.400<br>0.200<br>0.000<br>-0.200<br>-0.400<br>-0.600<br>-0.800<br>Monsoon Summer Winter PostMonsoon<br>Correlation coefficient<br><!-- End of picture text -->

Figure 5.4 Correlation coefficient between the selected indices and streamflow on seasonal 

time scale (1981-2018) in Brahmani basin 



<!-- Start of picture text -->
Baitarni<br>0.6<br>0.5<br>0.4<br>0.3<br>0.2<br>0.1<br>0<br>-0.1<br>-0.2<br>-0.3<br>-0.4<br>-0.5<br>-0.6<br>Monsoon Summer Winter PostMonsoon<br>Correlation coefficient<br><!-- End of picture text -->

Figure 5.5 Correlation coefficient between the selected indices and streamflow on seasonal time scale (1981-2018) in Baitarni basin 

### **5.3.3. Monthly results of correlation analysis** 

The correlation analysis was also performed at a finer temporal resolution of monthly time scale. The correlation coefficients for the climate indices at the temporal time steps with the average monthly time steps is shown in Fig. 5.6. The results at the monthly time scale showed variations from the annual time scale. In the Brahmani basin, all temperature indices, except DTR, show a significant negative relation (p < 0.01) with streamflow and precipitation indices, except DD, show significant positive relation to streamflow. For the Baitarni basin, DTR and 

49 

RX1day are insignificant (p > 0.05), while R95P and PRCPTOT showed significant positive correlation at 5% and 1% significance level respectively. Further the streamflow at the Baitarni basin showed negative correlation at 1% significance level for the TX10P, HD, WD, Tmaxmean and Tminmean indices. 

A comparison of the correlation between the annual time scale and monthly time scale show differing results. For instance, the minimum temperature average showed negative correlation at the annual scale, however, it was observed to be positive in the monthly scale for both the basins. Similarly, TN90P and TN10P correlation changed from negative to positive as the temporal scale resolution decreased from annual to monthly. The DTR and DD showed higher correlation at the monthly time step as compared to the annual time scale. A comparison between the Brahmani and Baitarni basin showed that the streamflow of Brahmani basin is more correlated with the PRCPTOT, RX1Day and R95P as compared to Baitarni basin, which is inconsistent with the annual time scale results. 



<!-- Start of picture text -->
Correlation with streamflow (Monthly)<br>0.8<br>0.6<br>0.4<br>0.2<br>0<br>-0.2<br>-0.4<br>-0.6<br>-0.8<br>Brahmani Baitarni<br><!-- End of picture text -->

Figure 5.6  Correlation coefficient between the selected indices and streamflow on monthly 

time scale, for the period 1981-2018 

### **5.3.4. Cross-correlation analysis at monthly time step** 

The foregoing analysis was performed by assuming that the impact of the climate indices would be immediate on the streamflow. However, it is possible that the climate of the previous month(s) may affect the streamflow variability in the current month, which could be observed from the intra-annual variability of the streamflow, precipitation and mean temperature (ref. Fig. 3.2). To understand the impact of past climate indices on the streamflow, cross correlation 

50 

analysis with climate indices up to 3 lags was performed. The correlation coefficient at 0, 1, 2 and 3 lags for Brahmani and Baitarni basin is shown in Fig. 5.7 and Fig. 5.8 respectively. In both the basins, it is observed that the maximum correlation of the temperature-based indices, except SU, is observed at lag 3. From the results it is observed that the correlation of the temperature indices changed from negative to positive as the lags are considered. For instance, TX10P, TX90P, SU, HW, and Tmaxmean showed positive correlation to the streamflow from the 1<sup>st</sup> lag. Further, it is also observed that the temperature indices of lag 3 had strongest correlation with the streamflowThe precipitation indices in the third month showed weak negative correlation. However, as mentioned earlier, further analysis is required to corroborate these findings and conclusions. 



<!-- Start of picture text -->
Correlation result with Lag (Brahmani)<br>0.8<br>0.6<br>0.4<br>0.2<br>0<br>-0.2<br>-0.4<br>-0.6<br>-0.8<br>0 1 2 3<br><!-- End of picture text -->

Figure 5.7 Correlation coefficients for streamflow and monthly extreme climate indices for different time lags for Brahmani basin 

51 



<!-- Start of picture text -->
Correlation result with Lag (Baitarni)<br>0.8<br>0.6<br>0.4<br>0.2<br>0<br>-0.2<br>-0.4<br>-0.6<br>0 1 2 3<br><!-- End of picture text -->

Figure 5.8 Correlation coefficients for streamflow and monthly extreme climate indices for different time lags for Brahmani basin 

## **5.4. Analysis of future climate change indices** 

The trends in the future climate indices for the projected climate obtained from different GCMs and for different scenarios is analysed to check the vulnerability of the basin to future climate change. In the first step, 13 GCMs were analysed for their applicability in the study area by performing a correlation analysis of the GCM simulated historical data with the observed IMD data. Among the 13 GCMs, the top 3 GCMs were selected for further analysis. In the selected three GCMs, bias corrected data of the CMIP6 (Mishra et al., 2020) for all the four scenarios were considered. The projected precipitation, maximum temperature and minimum temperature data from the GCMs for the period 2025-2100 was analysed for trend using Mann Kendall test. The results of all the three GCMs were similar, where majority of the grids showed significant increasing trend in all three climate variables. The trends in the climate variables in the four scenarios for one of the GCM (MPI ESMI 2 HR), which was having highest correlation is shown in Fig. 5.9 and it was also used for further analysis. It can be observed from the figure that there is significant increase in maximum temperature and minimum temperature in all scenarios except SSP126, where although most grids show increasing trend, the trend is not significant in majority of the basin. Similarly, the precipitation is showing increasing trend in all scenarios across the basin, however, the significant increasing trend is observed to be spatially varying. For instance, the significant increasing trend is observed in south west part of the basin in SSP 126, however it is observed in the south eastern and northern part in the SSP245. It is to note that the spatial variability in the trends observed in the historical period for the precipitation is not visible in the future time periods. In the historic period, majority of 

52 

the basin was experiencing decreasing trend for precipitation, however, in the future period the trend is observed to be increasing suggesting an impact on water resources of the basin. Similarly, minimum temperature was also observed to be decreasing in historic period but it was found to be increasing in the future projections. To further analyse the projected climate data, the trends in the 15 indices were also analysed in subsequent sections. However, for brevity, results pertaining to only two scenarios i.e., SSP245 and SSP585 are presented here. 

53 



<!-- Start of picture text -->
Pr TMax TMin<br>84° E 86° E 84° E 86°E 84°E 86° E N<br>[ai Ww E<br>Le Ha | O<br>© ass (le Ss<br>SN _ |e “EEE<br>a = ae (| 1 =z 2 2 2 ooeee e =<br>nN 1 x 8 x 8 Loo N<br>” LI Lt<br>ODES BESO<br>[| al [cat<br>BEERS ees) EEeeses<br>(a) LJ LTT | (b) (c) LJ PI)<br>84° E 86° E 84°E 86° E 84° E 86° E<br>84° E 86°E 84° E 86°E 84° E 86° E<br>Bo<br>CH eo :<br>EERE jae)<br>Nz2| oes PACE<br>oa OTF z BESao Kft<br>Qs eeecoos] «OtyNS ceON See,See SCLNy7] “eceeeesCidLZLooe «Cf<br>HoGeoS BEccoga Se aenay<br>BSpoooo aeeeee Coo<br>(a) HEaSeeoo0Coo SeSHSSDFeo SEESEaeBaoso0o<br>(e) ® oO no<br>84° E 86°E iil° ileo 84° E 86° E<br>84° E 86° E 84° E 86° E 84°E 86° E<br>(e)<br>[TI<br>on | [ T<br>o EEE (tales es LP<br>5 - |cect HEH He<br>a 2 2ann z 2) “ooo z 2) ‘Gee =<br>wos rity «6F hele a 8 [ms ia N<br>Os eee ee balis|ai} x Po<br>i See Bele lalelels) [aaa oo<br>GEREREUEESeee0 [eoBoE S| [elsesDH DREEE|un sett<br>@) LI mo (h) CI LT (i) [ual LT]<br>84°E (k) 86°E 84° E 86° E 84° E 86° E<br>84° E 86° E 84°E 86° E 84°E 86° E<br>z za<br>[TI (oa) Nx ; xN<br>rysit Hoes Boo[oe naa<br>wz] RES eI (sa Cee<br> & te =z 2) ee z 2| "oe z<br>oO” CootHGaooo Fys 8 FAHBEEEe NOR GEErErH+ 8<br>OOSOSEoOo)[ia[efi |] + +4+-]4- | [isoeiatsisiclsta]<br>C DODDODoIG) LI LO<br>(i) ele) (k) | Ss210N =SN<br>84° E 86° E 84°E 86° E 84°E 86° E<br>a Insignificant decreasing trend<br>[| Significant decreasing trend<br>0 70 140 280 420 560KiiGHiGISTS L Insignificantiani iincreasingi trend<br>Significant increasing trend<br><!-- End of picture text -->

### **5.4.1. Trends in Climate Indices for Future Time Period for SSP245** 

### **Scenario** 

The trend analysis plots for temperature and precipitation indices during the future period 20252100 are shown in the figure 5.10. In general, the trend analysis reveals an overall increasing temperature trend in the basin, with variations in the spatial distribution of temperature indices. Also, it is evident that all the indices, except for DTR and WD, exhibit a significant increasing trend. While the maximum and minimum temperature indices show significant increasing trend in entire basin, the Summer Days and the Heat Waves show insignificant increasing trend. As expected, the increase in the maximum temperature and the minimum temperature result in significant decreasing trend in the DTR and WD in most of the basins at the rates of -0.003 °C/year and -0.08/year, respectively. On the other hand, indices such as Mean Maximum Temperature, Mean Minimum Temperature, TN10P, TX10P, TN90P, and SU demonstrate significant increasing trend at rates of 0.015 °C/year, 0.019 °C/year, 0.02 °C/year, 0.015 °C/year, 0.026 °C/year, and 0.018 °C/year, respectively, across the entire basin. It is to note that the rate of increase in the future time periods is observed to be higher than the historical period. While the temperature is increasing throughout the entire basin, the maximum temperature exceeding 35°C is rising only in specific regions of the basin and this spatial variation leads to significant increases in indices such as TX90P, Summer Days, and Heat waves, primarily in the southern and eastern regions of the basin. 

For the precipitation indices in the future period of 2025-2100, it is observed that total annual precipitation and 95<sup>th</sup> percentile of the precipitation indices has shown significant increasing trend in northern and south-eastern regions of the basin at a rate of 3.38 mm/year and 0.011 mm/year respectively. RX1day, RD and DD are showing insignificant trend in the entire basin, though there is significant increase in precipitation, as these grids might be experiencing more intense rainfall events. The increasing rainfall in the basin has resulted in insignificant decreasing trend in the number of dry days. Further, it is also observed that the central and southern part of the basin is showing insignificant decreasing trend for RX1Day. The results may suggest that number of days with high intensity rainfall may increase and may cause flooding in the future time periods. 

55 



<!-- Start of picture text -->
i ~_ Te ere 84° E 86° E 84° E 86° E Ber E 86° E i<br>DTR TMaxmean i<br>ae | a.BaneTMinmean L TX10P HERS7 TX90P “~O E<br>: = =| z=2/ Ho z2| oS |e.) ee .<br>g™ 8= 8 SDEeonPeed NAon feBoo NN 38 See oo aNA2 (a)Co el 2§<br>atc nacoom Beecanoe Soe<br>anon bshatedet abate EESSoom t+—+—H}<br>[et eff FESS 7 GRECO<br>i = _ = TE | aie<br>(b) (c) (a) — (e) |<br>we oie al aie 84° E 86°E 84° E 86° E 84° E 86°E<br>84°E 8e°E 84°E 86° E mee ae see see aie —<br>Co TN10P<br>naene | "he oe “4 Lo<br>ele) BEasoe riot<br>= [afiergs ni) nf] lealsbel ela papaya<br>y Booooanna N< iz Ne= = >-|. SeesHERS oe! az>|i SoooOaeeo F=<br>aaTTT 23 RA] Hoo NN) eee Ps<br>HL_ qeceasasCoo CCCCeegeecaoee<br>v | (9) ‘i a) ©<br>ia ail 84° E 8e°E 84° E 86° E 84° E 86°E 84°E 86°E<br>84°E 86° E 84°E 86° E 84°E 86°E 84° E 86°E 84° E 86° E<br>me PROPTOT RD RX1day ,  R95P<br>Coo LL<br>:| St Lit<br>. 2 = 2) Soe zz zz zs 7 z<br>ATT Se] BqSseeaesHH [® & sl ry Sh] GochEya<br>- HesSaeo<br>(k) (I) seaaies (n) E (o) —<br>BEE = see = ere Seve 84° E 86° E ee Sere<br>°a95 190 380 570ees760, Kilometers, —i[| InsignificantSignificanti.  decreasing decreasing.  trend trend [|[| InsignificantSignificant increasing trend increasing trend<br><!-- End of picture text -->



<!-- Start of picture text -->
84°io E 86°oO E 84°E° 86°Eo 84° E 86° E 84°E 86°E 84°E 86° E N<br>DTR —[>_TMaxmean TMinmean| w E<br>oe o Hh ma er oH ™r<br>mano SIEPIEEL eiooo elaialaia<br>z Sooo ooo [is aa 8<br>iNa a|OK H-+—1 6fee) | xsCle =| Ssa is=| Eeoocoo :z<br>N48 ay | | a 8 HH N 8 Ooonon Q<br>laisse HSS eens | eee fais} [i |<br>Poco HESSaaoe) CCoe SEEEEEret<br>SEDaneoe HoGEogom a Hesaaen<br>BP Eee HH<br>84°E 86°E 84°E 86° E 84° 86° E 84° E 86°E 84° E 86° E<br>84°E 86° E 84°E 86° E 84° E 86° E 84°E 86° E 84° E 86°E<br>pooH o ca maor ce g TN90P SU _ HW<br>Rear i PEPE<br>” | opeeeC e eee || oeBeoooosoeee |S A aR aE etHH [8<br>(g) (i) (i)<br>84° E 86° E 84° E 86°E 84° E 86° E 84° E 86° E 84° E 86°E<br>84°E 86° E 84° E 86°E 84° E 86°E 84° E 86°E 84°E 86°E<br>py PRCPTOT RD DD RX1day _  R9SP<br>CH Co<br>Co Coo<br>Apeeo eee:<br>2| "Hs, lee ze za1 4 : i) ae, OE<br>N COC NH aN Qa N 8 aaa y<br>Goooooo!seoeee oosana<br>aigigele = Econo<br>(k) ) - m) (n) (0)<br>84° E ae°E 84° E 86°E 84°E 86° E 84° E 86°E 84°E 86°E<br>0 [| Insignificant decreasing trend j Insignificant increasing trend<br>CS95 190 380 res570 760 Kilometers‘ [ ]aBe9 A Significant increasing trend<br><!-- End of picture text -->

### **5.4.2. Trends in Climate Indices for Future Time Period for SSP585** 

### **Scenario** 

In the entire catchment, all the temperature-related indices, except DTR and WD, show a significant increase under the SSP585 scenario as can be observed from Fig. 5.11(a) to Fig. 5.11(j). This observation aligns with the corresponding trends in the minimum and maximum temperatures across the entire basin, as shown in Fig. 5.9. The temperature indices Tmaxmean, Tminmean, TX10P, TX90P, TN90P are increasing at a rate of 0.04 °C/year, 0.05 °C/year, 0.06 °C/year, 0.03 °C/year and 0.036 °C/year, which is observed to be slightly higher than SSP 245 scenario. The summer days and heat waves are increasing at a rate of 0.57 and 0.31 per year. The decrease in DTR and WD can be attributed to the significant increase in both minimum and maximum temperatures throughout the basin. The Diurnal Temperature Range and winter days are decreasing at a rate of 0.008 °C/year and 1/year. When the minimum temperature rises, the temperature difference between maximum and minimum temperature tends to decrease, resulting in a decreasing trend in DTR. Similarly, with increasing temperatures, the number of winter days’ decreases, as colder temperatures become less frequent. 

The results of the precipitation indices indicate notable trends in various indices. PCRPTOT, R95P, and RD exhibit a significant increasing trend (Fig. 5.11) across most parts of the basin, while DD shows a significant decrease in the northern and western regions of the basin. This trend aligns with the projected increase in precipitation under the SSP 585 scenario. It should be noted from Fig.5.11(k) to Fig.5.11(o) that the daily precipitation data for this future scenario shows a significant increase only in few areas within the basin, but the annual precipitation and the 95th percentile of precipitation show significant increase in trend throughout the entire catchment. Despite the overall increase in annual precipitation across the basin, the number of rainy days and the maximum 1-day precipitation show a significant increase only in the northern and western regions of the basin. These areas may experience intense rainfall events, which is further evident from the R95P index in the SSP 585 scenario. 

### **5.4.3. Comparison of historical and future climate signals** 

By comparing the climate data between two periods, historic period (1951-2018) and future period (2025-2100), a climate change signal can be identified. From the aforementioned results it is evident that there is a shift in the trend of climate data from the historic period to the future period in both the scenarios. In the case of DTR, which exhibited an increasing trend throughout the entire basin in the historic period, there is an indication of a decreasing trend 

58 

across the entire basin in the SSP585 scenario for the future period. Similarly, majority of the grids in the SSP245 scenario also show a decreasing trend in DTR. This shift can be attributed to the projected increase in both maximum and minimum temperatures in the future. Regarding maximum temperature-related indices, all the indices show a significant increasing trend in the southern parts of the basin during the historic period. In the future scenarios (SSP585 and SSP245), these indices exhibit a significant increasing trend across the entire basin. On the other hand, the indices related to minimum temperature indicate a decreasing trend in the north western regions of the basin during both the historic and future periods. Please note that for more reliable conclusions, the data pertaining to other GCMs and bias correction and downscaling techniques must be analysed. 

## **5.5. LULC change analysis within the study watershed** 

In addition to analysis of climate change signals within the basins, the study also evaluates the LULC changes and their impacts on the hydrology of the basin. The LULC change in the Brahmani and Baitarni basin was analysed by considering the historical decadal LULC maps for 1985, 1995 and 2005, obtained from NASA. The change in the recent decades was analysed by developing LULC maps for 2014, 2017 and 2021 using Landsat 7 and 8 images in the google earth engine. Three machine learning algorithms, SVM, RF, and CART, were used to classify the images into four LULC classes. Further, future LULC maps were predicted to analyse the predicted change in future LULC and its impact on the hydrology of the basin. 

### **5.5.1. Accuracy Assessment of the classified LULC maps** 

The Landsat 7 and Landsat 8 images for the years 2007, 2014 and 2021 were classified into 4 LULC classes i.e., Water, Forest, Built-up and Agriculture. The accuracy of the LULC classification for the 2007, 2014 and 2021 was evaluated using UA, PA, overall accuracy and kappa coefficient. While the UA and PA were estimated for each class, the overall accuracy and the kappa coefficient were obtained for all classes combined. The overall accuracy and kappa coefficient for the 3 maps and 3 algorithms is shown in Fig. 5.12. From the figure, it is evident that the RF algorithm has performed best in terms of both overall accuracy and kappa coefficient for all the three years. It is also observed that the kappa coefficient gradually decreased from 2007 to 2021 for CART, from 0.89 to 0.7, and for SVM, from 0.92 to 0.88. However, the value of kappa remained around 0.95 for RF for all the three years. This result of less accuracy for CART and SVM could be attributed to the single decision tree-based method used in CART and the sensitivity of SVM to large datasets and outliers (Shao & 

59 



<!-- Start of picture text -->
2007 2014 2021<br>100% 100% 100%<br>90% 90% 90%<br>80% 80% 80%<br>70%60% 70%60% | 70%60%<br>50% 50% 50%<br>CART SVM RF CART SVM RF CART SVM RF<br>mOA mKAPPA MOA mKAPPA mOA mKAPPA<br>(a) (b) (c)<br><!-- End of picture text -->

|**LULC CLASSES**||**CART**|**SVM**|**RF**|**CART**|**SVM**|**RF**|**CART**|**SVM**|**RF**|
|---|---|---|---|---|---|---|---|---|---|---|
|**WATER**|UA<br>PA|100%<br>96%|91%<br>98%|100%<br>96%|84%<br>90%|87%<br>93%|100%<br>98%|93%<br>85%|93%<br>95%|100%<br>100%|
|**FOREST**|UA<br>PA|92%<br>92%|98%<br>89%|96%<br>96%|89%<br>81%|93%<br>84%|97%<br>97%|92%<br>83%|94%<br>86%|98%<br>98%|
|**BUILTUP**|UA|73%|80%|87%|70%|73%|93%|57%|69%|97%|
|**-**|PA|85%|92%|93%|72%|75%|97%|57%|100%|94%|
|**AGRICULTURE**|UA|91%|91%|94%|50%|52%|94%|68%|95%|98%|
||PA|91%|91%|96%|59%|62%|89%|86%|91%|98%|



### **5.5.2. Historical LULC changes** 

As mentioned earlier, the LULC changes from 1985 to 2021 were observed from the decadal LULC maps of 1985, 1995, and 2005, and the LULC maps derived for 2007, 2014 and 2021 as shown in Table 5.2. A comparison of LULC change from 1985 to 2021 indicate that the area under forest and water decreased by 18% and 51% respectively, while the built-up area has increased by approximately 553%, rising from 657 km<sup>2</sup> in 1985 to 4295 km<sup>2</sup> in 2021. It can be observed from the data that the change in built-up area from 1985 to 2005 was marginal with an increase of 19% from the 1985. However, a sharp increase in the built-up area was observed from 2007 onwards, with built-up area increasing from 995 km<sup>2</sup> to 4295 km<sup>2</sup> with an increasing rate of 235 km<sup>2</sup> per year. The expansion of built-up areas for industries and cities, particularly around urban centres in the basin, is the main reason for this sharp increase (Singh et al., 2022). The 2011 census report also showed a significant increase in population across the basin as compared to the 2001 census report. The comparison of the maps revealed that much of the built-up area expansion has occurred at the expense of forests, leading to a reduction in forest cover in the Brahmani and Baitarani basin as shown in Fig 5.13. Agriculture, which is the primary activity and dominant land cover type in the watershed, has remained almost constant, 

61 



<!-- Start of picture text -->
LULC 2007 LULC 2014 LULC 2024 N<br>(a) (b) (c)<br>LULC Maps<br>Ei Water iz Forest<br>aS Built-up [| Agiuituce =0 65 130 260 390 520 Kilometers<br><!-- End of picture text -->

combinations such as 1985-2007, 2007-2014, and 2014-2017 transition matrices. The 20072014 transition matrix exhibited the highest probability of change for built-up areas, as indicated in Table 5.3, and was thus selected for further analysis. The results of the study revealed that agriculture is the most stable class, followed by forest, water, and built-up, with a probability of conversion to itself at 0.83, 0.74, 0.55, and 0.44, respectively. The Markov chain was used to compute this probability based on the historic changes in the input maps of 2007 and 2014. Although the probability of conversion of all classes to built-up was slightly less than agriculture, the rate of change of built-up was the highest, i.e., 266% during the given time period. The state of a cell is updated after each time step in the cellular automata model based on the transition probabilities and neighborhood to reflect the changes that have occurred. This approach allowed the model to accurately simulate and predict LULC changes over time. 

Table 5.3: Transition matrix that illustrates the probability of conversion of one class to other class for the period 2007-2014 

|**Classes**|**Water**|**Forest**|**Built-up**|**Agriculture**|
|---|---|---|---|---|
|**Water**|0.548|0.145|0.260|0.047|
|**Forest**|0.002|0.742|0.042|0.214|
|**Built-up**|0.025|0.227|0.444|0.304|
|**Agriculture**|0.007|0.079|0.076|0.838|
|**Probability of**<br>**conversion**|0.034|0.368|0.378|0.56|



### **5.6.2. Sensitivity analysis of Spatial Variables and Hyperparameters of ANN model** 

The LULC predictions were performed using a combination of CA model and ANN model. Prior to using the ANN model, the inputs and parameters of the models must be identified through a trial-and-error procedure. In order to examine the most influential factors for determining LULC change, a sensitivity analysis was performed and the model was trained with different schemes of spatial factors for achieving best training kappa value. The spatial factors were categorized into four schemes i.e., S1 to S4 as shown in Table 5.4. Broadly, the categories were physical factors (S1), socio-economic (S2) and a combination of these two (S3 & S4). 

63 

Table 5.4: Sensitivity analysis of nine spatial variables using four schemes S1, S2, S3 and S4 and training kappa 

|**Schemes**|**Spatial Variables**<br>**Training kappa**|
|---|---|
|S1|DEM, Slope, Aspect, Distance from stream,<br>Mean annual Precipitation<br>0.51|
|S2|Distance to Road, Distance to rail, Distance<br>from built-up, Population density<br>0.65|
|S3|DEM, Slope, Distance to Road, Distance<br>from built-up, Population Density<br>0.68|
|S4|DEM, Distance to Road, Distance to rail,<br>Distance from built-up, Population Density<br>0.59|



Table 5.5: Trails performed for the sensitivity analysis of hyper parameters of the ANN model 

|**Trials**|**Learning**<br>**rate**|**Number of**<br>**iterations**|**Number of**<br>**hidden layers**|**Training Kappa**|
|---|---|---|---|---|
|T1|0.01|500|8|0.38|
|T2|0.01|500|12|0.41|
|T3|0.005|300|8|0.68|
|T4|0.005|500|12|0.48|
|T5|0.005|800|8|0.44|
|T6|0.005|800|12|0.38|



During ANN training, hyperparameters tuning is important to achieve best solution and to avoid overfitting or under-fitting. Therefore, for each scheme, different sets of hyperparameters (number of iterations, learning rate and number of hidden layers) were tried as presented in Table 5.5. It was found that in all the cases, maximum training kappa was achieved with a learning rate of 0.005 and hidden layers as 8. The number of iterations, however, varied as in some cases best results were obtained with <mark>500 iterations but with scheme S3, early stopping was adopted after 300 iterations. As indicated in Table 5.4, Scheme</mark> S3 outperformed all other schemes with a maximum kappa value of 0.68. This can be attributed to the integration of physical factors such as DEM and slope which considers the topographical factors affecting 

64 

LULC change and socio-economic factors such as population density and distance to road and built-up. These factors when combined, better represent the LULC changes over time and thus can be used with ANN for further prediction. 

### **5.6.3. LULC Prediction** 

For future LULC analysis, future maps of 2028, 2035, 2056, and 2070 were predicted using 2007 and 2014 maps by adopting both ANN and Logistic regression techniques in MOLUSCE plugin.    As mentioned before, 2000 samples were used with each model i.e., ANN and LR for training. Based on **t** he sensitivity analysis results **,** scheme S3 with hyperparameter set T3 was considered i.e., (learning rate= 0.005, number of hidden layers = 8 and number of iterations = 300) for the entire analysis in ANN. The ANN model considers the overlay of changes in the input maps and selected spatial factors (i.e., DEM, Slope, Distance from roads, distance from built-up areas and population density) to develop a relationship between the two. It extracts the most sensitive factor by assigning weights and biases to it which aids in future LULC prediction. The Fig. 5.14 below shows the ANN network learning curve i.e., error vs number of iterations. As the number of iterations increase, minimum validation error reduced to 0.06 with a training kappa of 0.68 which was found to be satisfactory. The trained model is then validated with LULC 2021 map with an overall kappa of 0.51 for ANN. However, with LR, during training, R<sup>2</sup> was 0.7 and overall kappa of 0.47 after validation. On comparison of 2021 predicted maps using LR and ANN with that of reference, it was found that for all the classes, even though there is a good agreement between the model simulated maps and reference maps, both ANN and LR gave slightly higher values of area under each class, except for Forest class. Therefore, to further assess the LULC changes in future, a comparison of the built-up class was performed as the variation in the prediction of the Built-up class was observed be more. 

65 



<!-- Start of picture text -->
oielLl.. as voce oo voce — occ 7 bone a | 7 Mallidation<br>oosl. TENG | eT TEE WW Ny, Ny<br>0.04 i i i i f Beit in<br>oO ia) 100 150 200 250 300 350<br><!-- End of picture text -->

While the artificial neural network (ANN) projected a decrease in the areas of agriculture and forest, these classes remained relatively constant throughout the studied period with LR indicated by Figure 5.15 **.** It is to note that the LR model achieved an R square value of 0.7 during training; however, it could not effectively capture the non-linear relationships between spatial factors and input maps which could also be the reason for less validation kappa of 0.47. However, the weights assigned to spatial factors by ANN coupled with the Markov generated transition matrix enhanced the capability of cellular automata which considers the state of neighborhood cells in deciding the final spatial-temporal pattern of all the classes. This also highlights the role of factors such as proximity to roads, rail, built-up etc. and socio-economic factors as population density in causing built-up area to expand. The capability of ANN to learn from extensive datasets for feature selection and extraction enables the identification of the most crucial predictor variables, which could have contributed to the different projections between ANN and LR. From the spatial land cover maps of 2028, 2035 and 2070, it has been observed that most of the built-up has expanded in the north eastern, western and south western part of the basin where major cities such as Ranchi, Rourkela, Cuttack are present respectively as shown in Fig. 5.15. This could be due to the development of infrastructure and industrial setup in those areas. 

The overall analysis reveals that the expansion of one land classification corresponds with a decrease in other categories and vice versa except agriculture which remained constant throughout the time period. Also, since, approximately 52% of the basin is under agriculture (which includes both crop land and fallow land), it has remained a stable and dominant class. Although most of the agriculture is rainfed, which supports Kharif crops, the basin frequently receives flooding during onset of Rabi which improves the fertility of the soil and promotes agriculture to be the primary activity. Area under forest and water has also been reduced significantly due to deforestation for meeting the needs of fodder and timber products and encroachment for mining and settlements (Reddy et al., 2014). However, the slow rate of decrease is attributed to enforcement of strict forest policies to increase area under Mangroves taken up by Government of Orissa, MOEFCC and water conservation measures taken in the basin (WRIS, 2014). The analysis of results also reveals that an increase in built-up areas in the future would require policy-makers to prioritize these categories when formulating policies for the basin 

67 



<!-- Start of picture text -->
LULC 2028 LULC 2035 LULC 2056 LULC 2070<br>(a) iN<br>z<br>Zz<br>|<br>a<br>sleet ipa<br>BE Weter HR Forest FB suitt-up J) Agricutture 0 e e85 170 340s510 680kr<br><!-- End of picture text -->

## **5.7. Hydrological Model (SWAT) Calibration and Validation** 

The impact of climate change on the hydrology of the Brahmani and Baitarni basins was analysed for both historical periods and future projections using SWAT model. A combined SWAT model was setup for both the basins and the model was calibrated using the observed flow data at the Tilga gauging site. To analyse the impact of historical climate and land use changes, separate models were setup for 4 different decades as discussed in Chapter 4. The models for each of the decade were calibrated separately with maximizing NSE as objective function in the SWATCUP. In all the decades, with exception of 2011-2017, the model was calibrated for first 7 years and validated for the remaining 3 years. For all the models two years of warm-up period was considered. Prior to the calibration, sensitivity analysis for 28 streamflow influencing parameters was performed. Based on the p-value and t-value statistics, the top 15 sensitive parameters were considered in the calibration of the models. The calibrated parameter values of the four different models is shown in Table 5.7. From the table it is evident that the best performing parameters vary with changing climate and LULC. For instance, the CN, which is one of the most sensitive parameters increased from -0.21 to 0.02 from M1 to M4 model, indicating that more runoff is generated in the recent decades. It is to note that the optimized ranges of the parameters were also different for each of the models. 

The performance of the models in the calibration and validation periods was assessed using NSE, PBIAS and R<sup>2</sup> as shown in Table 5.8. All the models performed satisfactorily in terms of NSE with NSE >0.5 in the calibration period. Similar performance was observed in the validation period for M1, M2 and M3 models. The M4 model had a poor NSE of 0.14, however, the PBIAS and R<sup>2</sup> was in satisfactory range as per Moriasi et al. (2015). In general, the model over predicted the streamflow in the calibration period as is evident from Fig. 5.16 and the PBIAS values. Although the models were over predicting, the volumetric difference was relatively less as can be observed from lower PBIAS values. On the contrary, the model simulations were observed to be under predicting in the validation period and the volumetric difference was high as can be seen from high PBIAS values and the hydrographs in Fig. 5.16. 

69 

Table 5.7 Description of sensitive parameters, their range and best fitted values of the base models M1, M2, M3 and M4 

|**S.No**|**Parameter**|**Description**|**Range**|
|---|---|---|---|
|1|CN2|Initial SCS runoff number for moisture condition II|(-0.2,0.2)|
|2|ALPHA_BF|Baseflow alpha factor (1/days)|(0,1)|
|3|GW_DELAY|Groundwater delay time (days)|(30,450)|
|4|GWQMN|Threshold depth of water in the shallow aquifer<br>required for return flow to occur (mm H2O)|(0,5000)|
|5|CH_N2.|Manning’s n value for the main channel|(0.01,0.3)|
|6|CH_K2|Effective hydraulic conductivity in main channel<br>alluvium (mm/hr)|(-0.01,500)|
|7|ESCO|Soil evaporation compensation factor|(0,1)|
|8|GW_REVAP|Groundwater ‘revap’ coefficient|(0.02,0.2)|
|9|REVAPMN|Threshold of evaporation in shallow aquifer|(0,350)|
|10|SOL_AWC|Available water capacity of the first soil layer (mm<br>H2O/mm soil)|(-0.25,0.5)|
|11|SLSUBBSN|Average slope length|(10,150)|



70 



<!-- Start of picture text -->
3500 Calibration period(1983-1987) 1000 Validation(1988-1990)<br>3000 ———= = = +SimulatedObserved 800 ———— — ‘SimulatedObserved<br>Q 2500 3<br>ro)3€2000 '| 3=600<br>iJ | ©<br>§3 1500 II i, I Sfo.) 400<br>@ 1000nO ' Ihit 1 '‘ ‘ pet""ul , tu aS 200 \: J<br>0 perk4s aPo: vie! PrigkBit wh.(i 0 pe1 hac yl}  =<br>0 200 400 600 800 1000 1200 1400 1600 1800 2000 0 200 400 600 800 1000 1200<br>Time (days Time (days<br>(a) (b)<br>Calibrati iod(1993-1997' Validation(1998-2000<br>_— alibration period( ) 2000 ( )<br>3000 '' -———= - *Simulated Observed ' ———= = +Simulated Observed<br>B 2500 } ; gue<br>EJJif | —<br>&2000 4 & \<br>&@ ; \ !i ® 1000 \<br>P= 1500 1, ‘4 i | &<br>% ! 1 1 = \<br>a 1000 an , (i 1 ! 2B '<br>500 ue: i; i :‘ ' | Q 500 t<br>Fe. Orsi SE. 1 wsmM oA MLN Lie FW,<br>0 200 400 600 800 1000 1200 1400 1600 1800 2000 0 200 400 600 800 1000 1200<br>Time (days Time (days<br>(c) (d)<br>800<br>3000 Calibration period(2003-2007) Validation(2008-2010)<br>——— Observed<br>Ee " Simulated = 600<br>=63 2000 | !1 ! E5<br>2 | 11 1 1I 3@ 400 |<br>+ l ! 1 hh s<br>£ 1000 Il Th 3<br>2 | 1 H : 9 200 : ,<br>a } Bi, 1 : Hi f | | wl<br>0 " as aa aa re heme re eo | eee aN nN<br>0 500 1000 1500 20 0 200 400 600 800 1000 1200<br>Time (days . Tune Bays<br>(e) (f)<br>2800 Calibration(2011-2014) ie Validation(2015-2017'<br>— <= Simulated 4000 = = Simulated<br>@ 1500 >=<br>2 3<br>E = 800<br>& 3 F<br>=2g,o 1000 so600 F<br>© 500 t fa]3 400 | 1 "|<br>f 200 \ \ ,<br>oN, ' a .<br>0 500 rian1000 MN, 1500 éie) 200da 400 di600 © 800 A1000 1200<br>Time (days Time (davs<br><!-- End of picture text -->



<!-- Start of picture text -->
2011-2014<br>3000 4 [ae “TIPPETT 0<br>2500 | 50<br>”<br>_ 2000 . 3<br>S 4500 HEE Precipitation(mm)<br>sg 150<br>® 1000<br>ra<br>500 ( a ) 200<br>; Lan We FO A,<br>0 200 400 600 800 1000 1200 1400<br>Time (days)<br>2015-2017<br>2500 0<br>2000 |! ”<br>~mB 40<br>= 1500<br>@ ——" Discharge (m/s)<br>= 1000<br>2 80<br>a 500 (b) 100<br>‘ LAER Nel eed ia<br>0 100 200 300 400 500 600 700 800 900 1000<br>Time (days)<br><!-- End of picture text -->



<!-- Start of picture text -->
°<br>o<br>2 o o<br>Sd eo o¢ o rs<br>* ¢ e<br>$0 9% % * ¢<br>oe<br>© 7 ° °<br>ao<br><!-- End of picture text -->

Table 5.8: Performance evaluation measures of different SWAT model set-ups using NSE, PBIAS and R<sup>2</sup> 

|**Perform**|**ance Measur**|**es**|**NSE**|**PBIAS**|**R**<sup>**2**</sup>|
|---|---|---|---|---|---|
|**LULC 1985**<br>|Calibration|(1981-87)|0.54|-4.1|0.54|
||Validation|(1988-90)|0.51|25.39|0.54|
|**LULC 1995**<br>|Calibration|(1991-97)|0.51|5.9|0.54|
||Validation|(1998-00)|0.57|21.78|0.63|
|<br>|Calibration|(2001-07)|0.58|-9.1|0.60|
|**LULC 2005**|Validation|(2008-10)|0.66|28.72|0.64|
|<br>|Calibration|(2011-15)|0.60|-2.8|0.60|
|**LULC 2017**|Validation|(2016-17)|0.14|-14.3|0.49|



### **5.7.1. Isolated impacts of climate and land use changes on the streamflow of the basin** 

The individual impacts of climate change and LULC changes on the streamflow of the Brahmani and Baitarni basin was assessed using the framework provided by Swain et al., (2021a). The change in streamflow was assessed by considering 12 different scenarios i.e., C2L1, C3L1, C4L1, C1L2, C3L2, C4L2, C1L3, C2L3, C4L3 C1L4, C2L4 and C3L4. These scenarios were designed such that the climate in each decade was forced through the model for each land use. The change in the streamflow for a particular decade was analysed by assuming the preceding decade as the baseline condition. The changes due to individual factors of climate and LULC change were assessed and the relative contribution was evaluated as shown in Tables 5.9 and 5.10. The changes in the streamflow due to climate change in the C2, C3 and 𝑐 𝑐 𝑐 C4 is denoted by Δ𝑄21, Δ𝑄32, and Δ𝑄43 respectively. Similarly, the changes in the streamflow due to the LULC change for L2, L3 and L4 is denoted by Δ𝑄21𝐿 , Δ𝑄32𝐿 and Δ𝑄43𝐿 respectively. The results in Table 5.9, show that there is a significant change in the streamflow due to climate and LULC. A comparison of the relative contribution of the changes suggest that the impact of climate change is increasing in the recent decades. In the last two decades, the LULC and Climate change were contributing equally to the changes in the hydrology, which can be attributed to the significant rise in the built-up area and changes in the precipitation patterns. 

73 

In the period of 1991-2000, the climate change impact and land use change impacts are quantified as 21.27% and 78.73% respectively when compared with the baseline period. Due to the impact of climate change, there is 2.88 m<sup>3</sup> /s increase in streamflow in the second period, 43.57 m<sup>3</sup> /s decrease in the third period and 4.96 m<sup>3</sup> /s decrease in the last period. On the other hand, the impact of LULC alterations resulted in 96.41 m<sup>3</sup> /s and 33.87 m<sup>3</sup> /s increase in first and third periods respectively and 36.26 m<sup>3</sup> /s decrease in the second period. The increase in urbanization and decrease in the forest cover is resulting in the increase in the runoff, however, the decreasing rainfall in the study area is reducing the streamflow. 

The mean monthly streamflow variability for all the 16 model scenarios, grouped by LULC, is shown in Fig. 5.19. An examination of the monthly rainfall pattern of the four decades suggests that the maximum rainfall is received in the August month for C1 and C3, while the maximum rainfall is received in July for C2 and C4. Similar variability is observed in the average monthly streamflow for the corresponding decades. For the LULC data of 1985, it is observed that there is increase in streamflow by 7.02 m<sup>3</sup> /s and 15.73 m<sup>3</sup> /s in C2 and C4 respectively and a decrease in in streamflow by 18.94 m<sup>3</sup> /s in C3 periods relative to the base line scenario (C1L1). This decrease is more in monsoon season (mostly in July), plausibly due to the change in the precipitation pattern. The streamflow changes for the climates of C1, C3 and C4, by considering the LULC of 1995 show an increase of 0.99 m<sup>3</sup> /s and decrease of 5.07 m<sup>3</sup> /s and 2.97 m<sup>3</sup> /s respectively as compared to C2L2. Fig. 5.19(c) illustrates that there is an increase in streamflow by 14.29 m<sup>3</sup> /s, 20.66 m<sup>3</sup> /s and 15.7 m<sup>3</sup> /s in C1, C2 and C4 respectively for the 2005 LULC map as compared to baseline scenario (C3L3). Considering the LULC map of 2017 and by comparing the scenarios corresponding to the baseline scenario of C4L4, it is observed that the streamflow is decreased for C1 by 7.1 m<sup>3</sup> /s and increased for C2 and C3 by 15.33 m<sup>3</sup> /s and 9.24 m<sup>3</sup> /s respectively. The results suggest that the LULC impacts are more in the Brahmani and Baitarni Basin as compared to the climate change impacts in the historical period. 

Table 5.9 Change in streamflow due to climate change and land use change and total changes 

|**Climate**|Δ𝑄21<br>𝐶<br>|27.59|
|---|---|---|
|**change**|Δ𝑄32<br>𝐶|94.67|
|**Streamflow**|Δ𝑄43<br>𝐶|64.17|
|**changes (m**<sup>**3**</sup>**/s)**<br>**Land use**|Δ𝑄21<br>𝐿|102.10|
|<br>**change**|Δ𝑄32<br>𝐿|82.75|
||Δ𝑄43<br>𝐿|62.59|



74 

||Δ𝑄21<br>𝑇|129.69|
|---|---|---|
|**Total**|Δ𝑄32<br>𝑇|177.41|
||Δ𝑄43<br>𝑇|126.77|



Table 5.10 Relative contribution of climate change and Land use change to streamflow variations 

|**Climate**|𝜃21<br>𝐶<br>|21.27|
|---|---|---|
|**change**|𝜃32<br>𝐶|53.36|
|**Relative**|𝜃43<br>𝐶|50.62|
|**contributions (%)**<br>**Land use**|𝜃21<br>𝐿|78.73|
|<br>**change**|𝜃32<br>𝐿|46.64|
||𝜃43<br>𝐿|49.38|



75 



<!-- Start of picture text -->
180 450<br>160 1.1 MI c112<br> | | i C2L1 (a) 400 | | HE C22 (b)<br>a c311 a C32<br>140 | | c41 350 | | c4L2<br>e120 @ 300<br>= 100 > 250<br>22<br>=80 £ 200<br>2 o@<br>® 60 ® 150<br>40 100<br>20 50<br>° p<br>FES EMSSS PFS IF VL FES KLM SST SF FL<br>Months Months<br>400 450<br>C13 MS. c1.4<br>350 | | EE C2L3 (c) 400 ; | I c2L4 (d)<br>(i c313 ( c34<br>300 HS 413 350 | | c4L4<br>g @ 300<br>3% 250 a<br>= = 350 |<br>3 200 E<br>o oc<br>E | E 200<br>£ 150 £<br>a | B 150<br>10050 ) | 5a<br>0 ) | | 5 0 | |<br>FELNN EPSPSx SF SFX FLx K FEFna EM SH PFa FON VF<br>Months Months<br><!-- End of picture text -->



<!-- Start of picture text -->
ES7<br>e 400 | |a sa2s1L2<br>ow<br>= 300<br>=<br>o<br>—_<br>E 200<br>@<br>a<br>100<br>0<br>< Sh oh ee<br>Months<br><!-- End of picture text -->

# **CHAPTER 6** 

# **6. SUMMARY AND CONCLUSIONS** 

## **6.1. Summary and Conclusions** 

In this study, a comprehensive framework was developed to investigate the individual and integrated effects of climate variability and LULC alterations on the streamflow. The study makes an attempt to understand the hydrologic response of the basin in both past and future periods by considering different scenarios. This section provides a concise summary of the significant conclusions and findings drawn from the study, which align with the specified objectives. 

The Mann-Kendall test was performed for meteorological data and climate indices in both historic and future for the periods 1951-2018 and 2025-2100 respectively. In the historic period, Brahmani and Baitarni basin experienced increase in temperature, which also have increased total precipitation and increased intensity of the rainfall. The trend in the precipitation is spatially heterogenous. As a result, the basin gets drier in north-western part and warmer in the southern part. From the trend analysis of the climate data and indices for the historic and future period, a climate change signal can be identified as there is a shift in trend of climate data between the two periods. For instance, DTR which showed an increasing trend throughout the entire basin in the historic period, there is an indication of a decreasing trend across the entire basin in the SSP585 scenario for the future period. It is also observed that the grids showing increased summer days, were also showing increased total precipitation and increased intensity of the rainfall. Similarly, with increasing temperatures, the number of winter days’ decreases, as colder temperatures become less frequent. Overall, the analysis shows how the climate is changing, with notable changes in maximum and minimum temperatures and the indices that relate them between the past and the future. The change in temperature and precipitation trends and patterns suggests that the water resources of the basin will be significantly impacted by the future climate. 

The correlation analysis between climate indices and streamflow revealed the linear dependence of streamflow on extreme climatic conditions (climate change indices). The analysis was aimed at improving the understanding of impact of climate variability on the streamflow. The interrelationship between the climate indices and its impact on the streamflow 

78 

variability was not considered in this study. In general, it was observed that the precipitation indices show positive correlation to the streamflow, while the maximum temperature indices show negative correlation. The correlation analysis at the annual time scale suggests that although the basins are located in similar climatological location, their response to the climate change may be different. The analysis at an even finer temporal resolution of monthly time scale shows differing results compared to annual time scale. As there is a possibility that past climate variations could affect present streamflow, cross-correlation analysis is performed, which revealed that the temperature indices of lag 3 had strongest correlation with the streamflow, indicating that temperature has delayed impact on the streamflow. On the contrary, the precipitation indices showed significant positive correlation for a lag of two months only. The delayed subsurface and baseflow contributions may account for the significant linear association between the streamflow and the 1 and 2 months lagged precipitation indices. However, as was previously stated, additional investigation is necessary to support these findings and conclusions. 

The detection and prediction analysis of LULC change is essential to comprehend its impact on the hydrological balance of a basin. The historical LULC change detection was performed for the period 1985 to 2017 (decadal analysis). For this purpose, machine learning algorithms have been utilized for classification and prediction, employing Landsat 7 & 8 images and algorithms like Random Forest, CART, and SVM in Google Earth Engine (GEE). Among these, Random Forest was the most accurate with an accuracy of 0.98 due to its ability to handle multiple classes with numerous decision trees. The major LULC classes considered within the basin are Forest, Agriculture, Built-up and Water. The percentage changes in area were observed as 9.15% decrease in forest, 3.10% decrease in agriculture, 25.06% decrease in water and 553.8% increase in built-up. The basin has experienced deforestation, due to intensification of agriculture, rapid growth in population and urbanisation during the period of 1985 to 2014. Subsequently, the classified maps were used along with spatial factors like DEM, slope, proximity to roads, built-up and socio-economic factors to predict LULC for 2028, 2035, 2056 and 2070. This was accomplished by integrating the CA-ANN model, in which ANN extracts the non-linear relationship of spatial factors and historical changes, and CA utilizes it in transition modeling by considering the existing neighborhood of all the pixels. However, it should be noted that the entire analysis assumes that the spatial factors remain unchanged over time, which could potentially impede the accuracy of future maps. Additionally, the accuracy of classified maps is contingent on the availability of training data and the resolution of Landsat 

79 

7 images. The LULC analysis has also highlighted the rapid expansion of built-up areas in recent years, encroaching upon agricultural and forested areas. Overall, the analysis of the Brahmani and Baitarani Basin revealed that the region is mainly agricultural with significant forest cover. However, the expansion of built-up areas could have significant implications for the region's ecosystem services and sustainability by encroaching upon agricultural and forested lands. 

The hydrologic assessment of the basin was performed using SWAT model. The model performed satisfactorily while simulating the hydrologic process of the basin except for the period (2011-2017) due to lack of simulation of dam and reservoir management or poor quality of the input data. It is one of the limitations of the study and it has partial impact on the hydrologic simulations. The study period for the assessment of climate and LULC on streamflow is divided into four sub periods. The change in the streamflow and the relative contributions of climate and LULC changes to streamflow variations in a particular decade was analysed by assuming the preceding decade as the baseline condition. The relative contributions of climate change in the three periods are quantified as 21.27%, 53.36% and 50.62% respectively, and the resulted relative contribution of land use changes are 78.73%, 46.64% and 49.38% respectively. The higher contribution of LULC change in the historic period in Brahmani and Baitarni basin is because of the land use alterations such as increased urbanization in recent decades. The analysis was extended to the future period to quantify the combined effects of climate and LULC changes on streamflow. This assessment revealed that there is rise in streamflow in all the scenarios with an increase of 13.76 m<sup>3</sup> /s in SSP 126, while SSP 245 results a smaller increase of 0.34 m<sup>3</sup> /s, SSP 370 exhibits a moderate increase of 6.99 m<sup>3</sup> /s, and SSP 585 demonstrated the largest increase of 33.88 m<sup>3</sup> /s. The study also compared the changes in future streamflow with historic period. It is observed that the streamflow is increased in future period by 39.69 m<sup>3</sup> /s and 73.83 m<sup>3</sup> /s under SSP 245 and SSP 585 scenarios respectively. Assessing the combined impacts of climate and LULC changes along with their isolated effects provides a comprehensive understanding of the streamflow response of the basin. The outcomes of the present study help the policy makers and decision makers in integrated watershed management practices and adopting suitable adaptation strategies. 

## **6.2. Limitations of the work** 

While assessing the climate variability impacts on streamflow, only linear relation is evaluated between climate change indices and streamflow. As the climate change impact on streamflow 

80 

may not be immediate, cross-correlation analysis is performed at monthly time but the seasonal lag effect is not considered. The downscaled and bias corrected GCM data can impact future projections of the climate as different downscaling techniques differ in robustness, accuracy, and output resolution. For future LULC predictions, MOLUSCE plugin in QGIS considered only two historical LULC maps. Also, the spatial maps were prepared for the year 2021. The Markov model also has the limitation of not considering t-1 time step to predict t+1 time step. Lack of reservoir and dam management while simulating the hydrological process of the basin, due to unavailability of data, partially affected the model simulations. 

## **6.3. Scope for future studies** 

The non-linear dependence of climate change and streamflow variations can be assessed to know the non-linear relation between the two variables. The choice of downscaling and bias correction techniques could be considered for certain regions as the accuracy of the techniques may vary for some climate variables and specific areas. Multiple GCMs can be considered for the more understanding of climate dynamics. Future prospects of the study could focus on enhancing the resolution of the produced LULC maps and incorporating more input data and dynamic spatial factors into the MOLUSCE plugin to enhance the future LULC predictions. Agricultural and developmental policies can be considered to investigate the effects on land use patterns. For the hydrologic impact assessment, reservoir and land management practices can be incorporated to have a complete knowledge of the hydrologic response of the Bahmani and Baitarni basin. Multi-criteria approach during model calibration using other variables other than streamflow (Evapotranspiration, soil moisture) and multi-site calibration may enhance the performance of the hydrological model. 

81 

# **REFERENCES** 

- Abbaspour, K. C., Faramarzi, M., Ghasemi, S. S., & Yang, H. (2009). Assessing the impact of climate change on water resources in Iran. _Water Resources Research_ , _45_ (10). https://doi.org/10.1029/2008WR007615 

- Abbass, K., Qasim, M. Z., Song, H., Murshed, M., Mahmood, H., & Younis, I. (2022). A review of the global climate change impacts, adaptation, and sustainable mitigation measures. In _Environmental Science and Pollution Research_ (Vol. 29, Issue 28, pp. 42539–42559). Springer Science and Business Media Deutschland GmbH. https://doi.org/10.1007/s11356-022-19718-6 

- Abdila, W. P., & Nugroho, B. D. A. (2021). Trend analysis of extreme precipitation indices in the southern part of Java. _IOP Conference Series: Earth and Environmental Science_ , _653_ (1). https://doi.org/10.1088/1755-1315/653/1/012032 

- Abebe, G., Getachew, D., & Ewunetu, A. (2022). Analysing land use/land cover changes and its dynamics using remote sensing and GIS in Gubalafito district, Northeastern Ethiopia. _SN Applied Sciences_ , _4_ (1). https://doi.org/10.1007/s42452-021-04915-8 

- Ahmad, I., Tang, D., Wang, T., Wang, M., & Wagan, B. (2015). Precipitation trends over time using Mann-Kendall and spearman’s Rho tests in swat river basin, Pakistan. _Advances in Meteorology_ , _2015_ . https://doi.org/10.1155/2015/431860 

- Alam, N., Saha, S., Gupta, S., & Chakraborty, S. (2021). Prediction modelling of riverine landscape dynamics in the context of sustainable management of floodplain: a Geospatial approach. _Annals of GIS_ , _27_ (3), 299–314. https://doi.org/10.1080/19475683.2020.1870558 

- Al-sharif, A. A. A., & Pradhan, B. (2015). A novel approach for predicting the spatial patterns of urban expansion by combining the chi-squared automatic integration detection decision tree, Markov chain and cellular automata models in GIS. _Geocarto International_ , _30_ (8). https://doi.org/10.1080/10106049.2014.997308 

- Amarasinghe, Upali A, Natwarlal Shah, & Tushaar. (2007). _Mapping of water productivity in irrigated agriculture in South Asia View project Scalling-up (Water Savings & Productivity) View project_ . https://www.researchgate.net/publication/42764775 

- Arora, M., Kumar, R., Malhotra, J., & Kumar, N. (2014). Correlations of Stream Flow and Climatic Variables for a Large Glacierized Himalayan Basin. _Journal of Water Resource and Protection_ , _06_ (14), 1326–1334. https://doi.org/10.4236/jwarp.2014.614122 

- Athar, H. (2014). Trends in observed extreme climate indices in Saudi Arabia during 19792008. _International Journal of Climatology_ , _34_ (5), 1561–1574. https://doi.org/10.1002/joc.3783 

82 

- Azam, M., Maeng, S. J., Kim, H. S., Lee, S. W., & Lee, J. E. (2018). Spatial and temporal trend analysis of precipitation and drought in South Korea. _Water (Switzerland)_ , _10_ (6). https://doi.org/10.3390/w10060765 

- Balogun, I. A., & Ishola, K. A. (2017). Projection of Future Changes in Landuse/Landcover Using Cellular Automata/Markov Model over Akure City, Nigeria. _Journal of Remote Sensing Technology_ , _5_ (1). https://doi.org/10.18005/jrst0501003 

- Balu, A., Ramasamy, S., & Sankar, G. (2023). Assessment of climate change impact on hydrological components of Ponnaiyar river basin, Tamil Nadu using CMIP6 models. _Journal of Water and Climate Change_ . https://doi.org/10.2166/wcc.2023.354 

- Bhattacharya, R. K., Das Chatterjee, N., & Das, K. (2021). Land use and Land Cover change and its resultant erosion susceptible level: an appraisal using RUSLE and Logistic Regression in a tropical plateau basin of West Bengal, India. _Environment, Development and Sustainability_ , _23_ (2), 1411–1446. https://doi.org/10.1007/s10668-020-00628-x 

- Carlos, Tarapues, J., Thornton, P., Jarvis, A., & Ramirez-Villegas, J. (2020). High-resolution and bias-corrected CMIP5 projections for climate change impact assessments. _Scientific Data_ , _7_ (1). https://doi.org/10.1038/s41597-019-0343-8 

- Cayan, D. R., Riddle, L. G., & Aguado, E. (1993). The Influence of Precipitation and Temperature on Seasonal Streamflow in California. In _WATER RESOURCES RESEARCH_ (Vol. 29, Issue 4). 

- Chawla, I., & Mujumdar, P. P. (2015). Isolating the impacts of land use and climate change on streamflow. _Hydrology and Earth System Sciences_ , _19_ (8), 3633–3651. https://doi.org/10.5194/hess-19-3633-2015 

- Chervenkov, H., & Slavov, K. (2020). Historical climate assessment of temperature-based ETCCDI climate indices derived from CMIP5 simulations. In _Comptes Rendus de L’Academie Bulgare des Sciences_ (Vol. 73, Issue 6, pp. 784–790). Academic Publishing House. https://doi.org/10.7546/CRABS.2020.06.05 

- Chettry, V., & Surawar, M. (2021). Delineating Urban Growth Boundary Using Remote sensing, ANN-MLP and CA model: A Case Study of Thiruvananthapuram Urban Agglomeration, India. _Journal of the Indian Society of Remote Sensing_ , _49_ (10). https://doi.org/10.1007/s12524-021-01401-x 

- Chokkavarapu, N., & Mandla, V. R. (2019). Comparative study of GCMs, RCMs, downscaling and hydrological models: a review toward future climate change impact estimation. In _SN Applied Sciences_ (Vol. 1, Issue 12). Springer Nature. https://doi.org/10.1007/s42452-0191764-x 

- Clarke, B., Otto, F., Stuart-Smith, R., & Harrington, L. (2022). Extreme weather impacts of climate change: an attribution perspective. _Environmental Research: Climate_ , _1_ (1), 012001. https://doi.org/10.1088/2752-5295/ac6e7d 

83 

- Cohen, J. (1960). A Coefficient of Agreement for Nominal Scales. _Educational and Psychological Measurement_ , _20_ (1). https://doi.org/10.1177/001316446002000104 

CWC. (2011). _Central Water Commission_ . 

- Denison, D. G. T., Mallick, B. K., & Smith, A. F. M. (1998). A Bayesian CART algorithm. _Biometrika_ , _85_ (2). https://doi.org/10.1093/biomet/85.2.363 

- Dey, P., & Mishra, A. (2017). Separating the impacts of climate change and human activities on streamflow: A review of methodologies and critical assumptions. In _Journal of Hydrology_ (Vol. 548, pp. 278–290). Elsevier B.V. https://doi.org/10.1016/j.jhydrol.2017.03.014 

- Dile, Y. T., Daggupati, P., George, C., Srinivasan, R., & Arnold, J. (2016). Introducing a new open source GIS user interface for the SWAT model. _Environmental Modelling and Software_ , _85_ , 129–138. https://doi.org/10.1016/j.envsoft.2016.08.004 

- Dogan, F. N., & Karpuzcu, M. E. (2023). Modeling fate and transport of pesticides from dryland agriculture using SWAT model. _Journal of Environmental Management_ , _334_ . https://doi.org/10.1016/j.jenvman.2023.117457 

- Duell, L. F. W. (1994). THE SENSITWITY OF NORTHERN SIERRA NEVADA STREAMFLOW TO CLIMATE CHANGE’. In _WATER RESOURCES BULLETIN_ (Vol. 30). 

- Easterling, D., Rusticucci, M., Semenov, V., Alexander, L. V, Allen, S., Benito, G., Cavazos, T., Nicholls, N., Easterling, D., Goodess, C., Kanae, S., Kossin, J., Luo, Y., Marengo, J., McInnes, K., Rahimi, M., Reichstein, M., Sorteberg, A., Vera, C., … Midgley, P. (2012a). _3 - Changes in Climate Extremes and their Impacts on the Natural Physical Environment_ (Vol. 3). Cambridge University Press. 

- Easterling, D., Rusticucci, M., Semenov, V., Alexander, L. V, Allen, S., Benito, G., Cavazos, T., Nicholls, N., Easterling, D., Goodess, C., Kanae, S., Kossin, J., Luo, Y., Marengo, J., McInnes, K., Rahimi, M., Reichstein, M., Sorteberg, A., Vera, C., … Midgley, P. (2012b). _3 - Changes in Climate Extremes and their Impacts on the Natural Physical Environment_ . Cambridge University Press. 

- Eastman, J. R. (2012). IDRISI Selva Manual - Guide to GIS and Image Processing. In _IDRISI Selva Manual_ (Issue January). 

- Feizizadeh, B., Omarzadeh, D., Kazemi Garajeh, M., Lakes, T., & Blaschke, T. (2023a). Machine learning data-driven approaches for land use/cover mapping and trend analysis using Google Earth Engine. _Journal of Environmental Planning and Management_ , _66_ (3). https://doi.org/10.1080/09640568.2021.2001317 

- Feizizadeh, B., Omarzadeh, D., Kazemi Garajeh, M., Lakes, T., & Blaschke, T. (2023b). Machine learning data-driven approaches for land use/cover mapping and trend analysis using Google Earth Engine. _Journal of Environmental Planning and Management_ , _66_ (3), 665–697. https://doi.org/10.1080/09640568.2021.2001317 

84 

- Felix, M. L., Kim, Y. K., Choi, M., Kim, J. C., Do, X. K., Nguyen, T. H., & Jung, K. (2021a). Detailed trend analysis of extreme climate indices in the upper geum river basin. _Water (Switzerland)_ , _13_ (22). https://doi.org/10.3390/w13223171 

- Felix, M. L., Kim, Y. K., Choi, M., Kim, J. C., Do, X. K., Nguyen, T. H., & Jung, K. (2021b). Detailed trend analysis of extreme climate indices in the upper geum river basin. _Water (Switzerland)_ , _13_ (22). https://doi.org/10.3390/w13223171 

- Fortini, L., & Schubert, O. (2017). Beyond exposure, sensitivity and adaptive capacity: a response based ecological framework to assess species climate change vulnerability. _Climate Change Responses_ , _4_ (1). https://doi.org/10.1186/s40665-017-0030-y 

- Gayathri, M., Adarsh, S., Shehinamol, K., Nizamudeen, Z., & Lal, M. R. (2022). Evaluation of change points and persistence of extreme climatic indices across India. _Natural Hazards_ . https://doi.org/10.1007/s11069-022-05787-w 

- Gidden, M. J., Fujimori, S., van den Berg, M., Klein, D., Smith, S. J., van Vuuren, D. P., & Riahi, K. (2018). A methodology and implementation of automated emissions harmonization for use in Integrated Assessment Models. _Environmental Modelling and Software_ , _105_ , 187–200. https://doi.org/10.1016/j.envsoft.2018.04.002 

- Gocic, M., & Trajkovic, S. (2013). Analysis of changes in meteorological variables using Mann-Kendall and Sen’s slope estimator statistical tests in Serbia. _Global and Planetary Change_ , _100_ , 172–182. https://doi.org/10.1016/j.gloplacha.2012.10.014 

- Gosain, A. K., Rao, S., & Basuray, D. (2006). Climate change impact assessment on hydrology of Indian river basins. _Current Science_ , _90_ (3), 346–353. https://www.jstor.org/stable/24091868 

- Han, P. F., Wang, X. S., Wan, L., & Kuang, X. (2022). Croplands decreased stability of streamflow with changing climate: An investigation of catchments in Illinois. _Journal of Hydrology_ , _606_ . https://doi.org/10.1016/j.jhydrol.2022.127461 

- Hosseiny, B., Abdi, A. M., & Jamali, S. (2022). Urban land use and land cover classification with interpretable machine learning – A case study using Sentinel-2 and auxiliary data. _Remote Sensing Applications: Society and Environment_ , _28_ . https://doi.org/10.1016/j.rsase.2022.100843 

- Jain, S. K., Kumar, V., & Saharia, M. (2013). Analysis of rainfall and temperature trends in northeast India. _International Journal of Climatology_ , _33_ (4), 968–978. https://doi.org/10.1002/joc.3483 

- Kalita, R., Kalita, D., & Saxena, A. (2023). Trends in extreme climate indices in Cherrapunji for the period 1979 to 2020. _Journal of Earth System Science_ , _132_ (2). https://doi.org/10.1007/s12040-023-02087-0 

- Kalyan, A. V. S., Ghose, D. K., Thalagapu, R., Guntu, R. K., Agarwal, A., Kurths, J., & Rathinasamy, M. (2021). Multiscale spatiotemporal analysis of extreme events in the Gomati River Basin, India. _Atmosphere_ , _12_ (4). https://doi.org/10.3390/atmos12040480 

85 

- Kamal, M., Jamaluddin, I., Parela, A., & Farda, M. (2019). Comparison of Google Earth Engine (GEE)-based Machine Learning Classifiers for Mangrove Mapping. _The 40th Asian Conference on Remote Sensing_ . https://www.researchgate.net/publication/357620992 

- kamaraj, manikandan, Rangarajan, S., & Kamaraj, M. (n.d.). _Predicting the Future Land Use and Land Cover Changes for Bhavani Basin, Tamil Nadu, India Using QGIS MOLUSCE Plugin Predicting the Future Land Use and Land Cover Changes for Bhavani basin, Tamil Nadu, India Using QGIS MOLUSCE Plugin 2 3 4 6 7_ . _603_ (203). https://doi.org/10.21203/rs.3.rs-616393/v1 

- Kletti, L., & Stefan, H. (1997). CORRELATIONS OF CLIMATE AND STREAMFLOW IN THREE MINNESOTA STREAMS. _Climate Chnage_ . 

- Krishnan, R., Sanjay, · J, Chellappan, ·, Milind Mujumdar, G. ·, Kulkarni, A., & Chakraborty, S. (2020). _Assessment of Climate Change over the Indian Region A Report of the Ministry of Earth Sciences (MoES), Government of India_ . 

- Kundu, A., Dutta, D. K., Rahman Siddiqui, A., Chatterjee, S., Dutta, D., & Siddiqui, A. R. (2015). Meteorological trend analysis in western Rajasthan (India) using Geographical Information System and statistical techniques. _Journal of Environment and Earth Science_ , _5_ (5), 2224–3216. www.iiste.org 

- Lambin, E. F., Geist, H. J., & Lepers, E. (2003). Dynamics of land-use and land-cover change in tropical regions. _Annual Review of Environment and Resources_ , _28_ , 205–241. https://doi.org/10.1146/annurev.energy.28.050302.105459 

- Lashkaripour, Sumangala, & Srinivas. (2022). A Systematic Review of Machine Learning Applications in Land Use Land Cover Change Detection using Remote Sensing. _International Journal of Applied Engineering and Management Letters (IJAEML) A Refereed International Journal of Srinivas University_ , _6_ (2), 2581–7000. https://doi.org/10.5281/zenodo.7495146 

- Lcrup, J. K., Refsgaard A’*, J. C., & Mazvimavi, D. (1998). Assessing the effect of land use change on catchment runoff by combined use of statistical tests and hydrological modelling: Case studies from Zimbabwe. In _Journal of Hydrology ELSEVIER Journal of Hydrology_ (Vol. 205). 

- Li, C., & Fang, H. (2021). Assessment of climate change impacts on the streamflow for the Mun River in the Mekong Basin, Southeast Asia: Using SWAT model. _Catena_ , _201_ . https://doi.org/10.1016/j.catena.2021.105199 

- Li, Chaoyue, Fang, & Haiyan. (2021). Assessment of climate change impacts on the streamflow for the Mun River in the Mekong Basin, Southeast Asia: Using SWAT model. _Catena_ , _201_ . https://doi.org/10.1016/j.catena.2021.105199 

- Li, Liu, W. zhao, Zhang, X. chang, & Zheng, F. li. (2009). Impacts of land use change and climate variability on hydrology in an agricultural catchment on the Loess Plateau of 

86 

China. _Journal of Hydrology_ , _377_ (1–2), 35–42. https://doi.org/10.1016/j.jhydrol.2009.08.007 

- Li, Y., Zhao, J., Miao, R., Huang, Y., Fan, X., Liu, X., Wang, X., Wang, Y., & Shen, Y. (2022). Analysis of the Temporal and Spatial Distribution of Extreme Climate Indices in Central China. _Sustainability (Switzerland)_ , _14_ (4). https://doi.org/10.3390/su14042329 

- López, E., Bocco, G., Mendoza, M., & Duhau, E. (2001). Predicting land-cover and land-use change in the urban fringe A case in Morelia city, Mexico. _Landscape and Urban Planning_ , _55_ (4). https://doi.org/10.1016/S0169-2046(01)00160-8 

- Lovino, M. A., Pierrestegui, M. J., Müller, O. V., Berbery, E. H., Müller, G. V., & Pasten, M. (2021). Evaluation of historical CMIP6 model simulations and future projections of temperature and precipitation in Paraguay. _Climatic Change_ , _164_ (3–4). https://doi.org/10.1007/s10584-021-03012-4 

- Mahato, P. K., Singh, D., Bharati, B., Gagnon, A. S., Singh, B. B., & Brema, J. (2022). Assessing the impacts of human interventions and climate change on fluvial flooding using CMIP6 data and GIS-based hydrologic and hydraulic models. _Geocarto International_ . https://doi.org/10.1080/10106049.2022.2060311 

- Malhi, Y., Franklin, J., Seddon, N., Solan, M., Turner, M. G., Field, C. B., & Knowlton, N. (2020). Climate change and ecosystems: Threats, opportunities and solutions. In _Philosophical Transactions of the Royal Society B: Biological Sciences_ (Vol. 375, Issue 1794). Royal Society Publishing. https://doi.org/10.1098/rstb.2019.0104 

- Maxwell, A. E., Warner, T. A., & Fang, F. (2018). Implementation of machine-learning classification in remote sensing: An applied review. In _International Journal of Remote Sensing_ (Vol. 39, Issue 9, pp. 2784–2817). Taylor and Francis Ltd. https://doi.org/10.1080/01431161.2018.1433343 

- Mishra, V., Bhatia, U., & Tiwari, A. D. (2020). Bias-corrected climate projections for South Asia from Coupled Model Intercomparison Project-6. _Scientific Data_ , _7_ (1). https://doi.org/10.1038/s41597-020-00681-1 

- Mondal, A., Khare, D., & Kundu, S. (2015). Spatial and temporal analysis of rainfall and temperature trend of India. _Theoretical and Applied Climatology_ , _122_ (1–2), 143–158. https://doi.org/10.1007/s00704-014-1283-z 

- Muhammad, R., Zhang, W., Abbas, Z., Guo, F., & Gwiazdzinski, L. (2022a). Spatiotemporal Change Analysis and Prediction of Future Land Use and Land Cover Changes Using QGIS MOLUSCE Plugin and Remote Sensing Big Data: A Case Study of Linyi, China. _Land_ , _11_ (3). https://doi.org/10.3390/land11030419 

- Muhammad, R., Zhang, W., Abbas, Z., Guo, F., & Gwiazdzinski, L. (2022b). Spatiotemporal Change Analysis and Prediction of Future Land Use and Land Cover Changes Using QGIS MOLUSCE Plugin and Remote Sensing Big Data: A Case Study of Linyi, China. _Land_ , _11_ (3). https://doi.org/10.3390/land11030419 

87 

- Myers, D. T., Ficklin, D. L., & Robeson, S. M. (2021). Incorporating rain-on-snow into the SWAT model results in more accurate simulations of hydrologic extremes. _Journal of Hydrology_ , _603_ . https://doi.org/10.1016/j.jhydrol.2021.126972 

- Nascetti, A., Di Rita, M., Ravanelli, R., Amicuzi, M., Esposito, S., & Crespi, M. (2017). Free global DSM assessment on large scale areas exploiting the potentialities of the innovative google earth engine platform. _International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences - ISPRS Archives_ , _42_ (1W1). https://doi.org/10.5194/isprs-archives-XLII-1-W1-627-2017 

- Ozturk, D. (2015). Urban growth simulation of Atakum (Samsun, Turkey) using cellular automata-Markov chain and Multi-layer Perceptron-Markov chain models. _Remote Sensing_ , _7_ (5). https://doi.org/10.3390/rs70505918 

- Panday, D. P., & Kumar, M. (2022). Climate indices and hydrological extremes: Deciphering the best fit model. _Environmental Research_ , _215_ . https://doi.org/10.1016/j.envres.2022.114301 

- Patel, S. K., Verma, P., & Shankar Singh, G. (2019). Agricultural growth and land use land cover change in peri-urban India. _Environmental Monitoring and Assessment_ , _191_ (9). https://doi.org/10.1007/s10661-019-7736-1 

- Pervin, L., & Khan, M. S. M. (2022). Variability and trends of climate extremes indices from the observed and downscaled GCMs data over 1950–2020 period in Chattogram City, Bangladesh. _Journal of Water and Climate Change_ , _13_ (2), 975–988. https://doi.org/10.2166/wcc.2021.331 

- Pu, R. (2021). Mapping Tree Species Using Advanced Remote Sensing Technologies: A Stateof-the-Art Review and Perspective. _Journal of Remote Sensing_ , _2021_ . https://doi.org/10.34133/2021/9812624 

- Reboita, M. S., Kuki, C. A. C., Marrafon, V. H., de Souza, C. A., Ferreira, G. W. S., Teodoro, T., & Lima, J. W. M. (2022). South America climate change revealed through climate indices projected by GCMs and Eta-RCM ensembles. _Climate Dynamics_ , _58_ (1–2), 459– 485. https://doi.org/10.1007/s00382-021-05918-2 

- Rivas, D., Tarquis, A. M., De Miguel, Á., Gobin, A., & Willaarts, B. (2022). Enhancing LULC scenarios impact assessment in hydrological dynamics using participatory mapping protocols in semiarid regions. _Science of the Total Environment_ , _803_ . https://doi.org/10.1016/j.scitotenv.2021.149906 

- Roy, P. S., P., M., P.K., J., M.P., K., V.K., S., S.K., S., M.D., B., A., R., Y., S., R.M., R., P., B., A.K., J., & Y.V.N., K. (2016). Decadal Land Use and Land Cover Classifications across India, 1985, 1995, 2005. _Ornl Daac_ . 

- Sadhwani, K., Eldho, T. I., & Karmakar, S. (2023). Investigating the influence of future landuse and climate change on hydrological regime of a humid tropical river basin. _Environmental Earth Sciences_ , _82_ (9). https://doi.org/10.1007/s12665-023-10891-6 

88 

- Saputra, M. H., & Lee, H. S. (2019). Prediction of land use and land cover changes for North Sumatra, Indonesia, using an artificial-neural-network-based cellular automaton. _Sustainability (Switzerland)_ , _11_ (11). https://doi.org/10.3390/su11113024 

- Shao, Y., & Lunetta, R. S. (2012). Comparison of support vector machine, neural network, and CART algorithms for the land-cover classification using limited training data points. _ISPRS Journal of Photogrammetry and Remote Sensing_ , _70_ , 78–87. https://doi.org/10.1016/j.isprsjprs.2012.04.001 

- Sinam, R. (2019). RAINFALL TREND ANALYSIS OF BAITARANI RIVER SUB-BASIN, ODISHA. _International Journal of Advanced Research_ , _7_ (10), 569–575. https://doi.org/10.21474/IJAR01/9868 

- Singh, B., Venkatramanan, V., & Deshmukh, B. (2022). Monitoring of land use land cover dynamics and prediction of urban growth using Land Change Modeler in Delhi and its environs, India. _Environmental Science and Pollution Research_ , _29_ (47), 71534–71554. https://doi.org/10.1007/s11356-022-20900-z 

- Sinha, R. K., Eldho, T. I., & Subimal, G. (2020a). Assessing the impacts of historical and future land use and climate change on the streamflow and sediment yield of a tropical mountainous river basin in South India. _Environmental Monitoring and Assessment_ , _192_ (11). https://doi.org/10.1007/s10661-020-08623-5 

- Sinha, R. K., Eldho, T. I., & Subimal, G. (2020b). Assessing the impacts of land cover and climate on runoff and sediment yield of a river basin. _Hydrological Sciences Journal_ , 2097–2115. https://doi.org/10.1080/02626667.2020.1791336 

- Sleeter, B., Loveland, T. R., Domke, G. M., Herold, N., Wickham, J., & Wood, N. J. (2018). _Chapter 5 : Land Cover and Land Use Change. Impacts, Risks, and Adaptation in the United States: The Fourth National Climate Assessment, Volume II_ . https://doi.org/10.7930/NCA4.2018.CH5 

- Strauch, M., & Volk, M. (2013). SWAT plant growth modification for improved modeling of perennial vegetation in the tropics. _Ecological Modelling_ , _269_ , 98–112. https://doi.org/10.1016/j.ecolmodel.2013.08.013 

- Sundar, Parthasarathy Deka, & Paresh Chandra. (2022). Spatio-temporal classification and prediction of land use and land cover change for the Vembanad Lake system, Kerala: a machine learning approach. In _Environmental Science and Pollution Research_ (Vol. 29, Issue 57, pp. 86220–86236). Springer Science and Business Media Deutschland GmbH. https://doi.org/10.1007/s11356-021-17257-0 

- Swain, S. S., Mishra, A., Chatterjee, C., & Sahoo, B. (2021a). Climate-changed versus landuse altered streamflow: A relative contribution assessment using three complementary approaches at a decadal time-spell. _Journal of Hydrology_ , _596_ . https://doi.org/10.1016/j.jhydrol.2021.126064 

- Swain, S. S., Mishra, A., Chatterjee, C., & Sahoo, B. (2021b). Climate-changed versus landuse altered streamflow: A relative contribution assessment using three complementary 

89 

approaches at a decadal time-spell. _Journal of Hydrology_ , _596_ . https://doi.org/10.1016/j.jhydrol.2021.126064 

- Swain, S. S., Mishra, A., Sahoo, B., & Chatterjee, C. (2020). Water scarcity-risk assessment in data-scarce river basins under decadal climate change using a hydrological modelling approach. _Journal of Hydrology_ , _590_ . https://doi.org/10.1016/j.jhydrol.2020.125260 

- Tabari, H. (2020). Climate change impact on flood and extreme precipitation increases with water availability. _Scientific Reports_ , _10_ (1). https://doi.org/10.1038/s41598-020-70816-2 

- Talukdar, S., Singha, P., Mahato, S., Shahfahad, Pal, S., Liou, Y. A., & Rahman, A. (2020a). Land-use land-cover classification by machine learning classifiers for satellite observations-A review. In _Remote Sensing_ (Vol. 12, Issue 7). MDPI AG. https://doi.org/10.3390/rs12071135 

- Talukdar, S., Singha, P., Mahato, S., Shahfahad, Pal, S., Liou, Y. A., & Rahman, A. (2020b). Land-use land-cover classification by machine learning classifiers for satellite observations-A review. In _Remote Sensing_ (Vol. 12, Issue 7). https://doi.org/10.3390/rs12071135 

- Tehrani, Sahour, H., & Booij, M. J. (2019). Trend analysis of hydro-climatic variables in the north of Iran. _Theoretical and Applied Climatology_ , _136_ (1–2), 85–97. https://doi.org/10.1007/s00704-018-2470-0 

- Tewabe, D., & Fentahun, T. (2020). Assessing land use and land cover change detection using remote sensing in the Lake Tana Basin, Northwest Ethiopia. _Cogent Environmental Science_ , _6_ (1). https://doi.org/10.1080/23311843.2020.1778998 

- Tumsa. (2023). The Response of Sensitive LULC Changes to Runoff and Sediment Yield in a Semihumid Urban Watershed of the Upper Awash Subbasin Using the SWAT+ Model, Oromia, Ethiopia. _Applied and Environmental Soil Science_ , _2023_ . https://doi.org/10.1155/2023/6856144 

- Uniyal, B., Jha, M. K., & Verma, A. K. (2015). Assessing Climate Change Impact on Water Balance Components of a River Basin Using SWAT Model. _Water Resources Management_ , _29_ (13), 4767–4785. https://doi.org/10.1007/s11269-015-1089-5 

- Van Niel, T. G., McVicar, T. R., & Datt, B. (2005). On the relationship between training sample size and data dimensionality: Monte Carlo analysis of broadband multi-temporal classification. _Remote Sensing of Environment_ , _98_ (4), 468–480. https://doi.org/10.1016/j.rse.2005.08.011 

- Veldkamp, A., & Lambin, E. F. (2001). Predicting land-use change. In _Ecosystems and Environment_ (Vol. 85). 

- Visweshwaran, Ramsankaran, R. A. A. J., Eldho, T. I., & Jha, M. K. (2022). Hydrological Impact Assessment of Future Climate Change on a Complex River Basin of Western Ghats, India. _Water (Switzerland)_ , _14_ (21). https://doi.org/10.3390/w14213571 

WRIS. (2014). _Version 2.0_ . www.india-wris.nrsc.gov.in 

90 

Zhang, X., Zhang, L., Zhao, J., Rustomji, P., & Hairsine, P. (2008). Responses of streamflow to changes in climate and land use/cover in the Loess Plateau, China. _Water Resources Research_ , _45_ (7). https://doi.org/10.1029/2007WR006711 

Zhou, B., Okin, G. S., & Zhang, J. (2020). Leveraging Google Earth Engine (GEE) and machine learning algorithms to incorporate in situ measurement from different times for rangelands monitoring. _Remote Sensing of Environment_ , _236_ . https://doi.org/10.1016/j.rse.2019.111521 

91 

