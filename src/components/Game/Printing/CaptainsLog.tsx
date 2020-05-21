import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import SquareCard from "components/Cards/SquareCard";

import './CaptainsLog.scss';
import SizedInCSS from "components/SizedInCSS";
import materials from "data/materials";
import slugify from "slugify";

export const CaptailsLogComponent : React.FC = () => (
  <SquareCard className={classNames("card","captains-log")}>
    <SizedInCSS>
      <div className="log">
        <h2>Captain's Log</h2>
        <p>Once you've finished playing, record the state of the ship here</p>
        <table className="log-table">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Captain(s)</th>
              <th>Star System</th>
              <th>Modules</th>
              <th>Crew</th>
              <th>Fuel</th>
            </tr>
            <tr className="sample handwritten">
              <td>1/6/20</td>
              <td>Autopilot</td>
              <td>The Last Shipyard</td>
              <td>5</td>
              <td>0</td>
              <td>1</td>
            </tr>
            {[...Array(13)].map((_, i) => (
              <tr key={i}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="materials">
        <h2>Components</h2>
        <p>Here, you can record what componets you're using for the game. Update it as you go.</p>
        <table className="materials-table">
          <tbody>
            {materials.filter(m => !m.hideFromLog).map(m => (
            <tr key={slugify(m.name)}>
              <td>{m.name}</td>
              <td className="material-space" />
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SizedInCSS>
  </SquareCard>
);

export const CaptainsLogPreviewComponent : React.FC<MaterialComponentProps> = ({className}) =>
  <div className={className}>
    <CaptailsLogComponent />
  </div>;

export const PrintCaptainsLogComponent : React.FC<PrintComponentProps> =
  ({className, buildOptionType}) =>
  <div className={classNames(className, buildOptionClasses(buildOptionType))}>
    <CaptailsLogComponent />
  </div>;
