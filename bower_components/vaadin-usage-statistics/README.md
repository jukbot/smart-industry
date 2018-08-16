# Gathers usage statistics for components used during application development

To be able to understand and focus development more efficiently, Vaadin gathers product usage statistics from developers. **No statistics or other data is collected from the users of the applications based on any Vaadin technologies.**

Periodical random sampling is used to ensure only statistical data is collected. **We do not track individual users.**

Statistics are only gathered when the application is in [development mode](https://github.com/vaadin/vaadin-development-mode-detector). Statistics are automatically disabled and the statistics gathering code is automatically excluded from production builds.

## Collected data
* Vaadin products used in the application, including version numbers
* [Frameworks](vaadin-usage-statistics.html#L17) used in the application, including version numbers
* [Flow features](https://github.com/search?utf8=%E2%9C%93&q=org%3Avaadin+UsageStatistics.markAsUsed&type=Code) used in the application, including version numers
* The first and last time a product was used
* The first time statistics were gathered
* Whether you are a registered vaadin.com user or not (true/false)
* Whether you are a Vaadin Pro user or not (true/false)
* Browser user-agent string
* The IP address the statistics is sent from

## Opting out
To opt-out from statistics, install the no-op version of the `vaadin-usage-statistics` package using
```
bower install --save vaadin/vaadin-usage-statistics#optout
```
You can verify this by checking that `vaadin-usage-statistics.html` is empty.

If you are using Java, add to your pom.xml:
```
<dependency>
  <groupId>org.webjars.bowergithub.vaadin</groupId>
  <artifactId>vaadin-usage-statistics</artifactId>
  <version>1.0.0-optout</version>
</dependency>
```

If you have any questions on the use of the statistics, please contact statistics@vaadin.com.
