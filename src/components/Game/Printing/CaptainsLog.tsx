import { MaterialComponentProps, buildOptionClasses, PrintComponentProps } from "model/Materials";
import React from "react";
import classNames from "classnames";

import SquareCard from "components/Cards/SquareCard";

import './CaptainsLog.scss';
import SizedInCSS from "components/SizedInCSS";

export const CaptailsLogComponent : React.FC = () => (
  <SquareCard className={classNames("card","captains-log")}>
    <SizedInCSS>
      <div className="log manifest">
        <h2>Captain's Log</h2>
        <p>Once you've finished playing, record the state of the ship here</p>
        <table className="log-table">
          <tbody>
            <tr>
              <th style={{width: "6%"}}>Codename</th>
              <th style={{width: "6%"}}>Date</th>
              <th>Captain(s)</th>
              <th>Star Systems</th>
              <th style={{width: "8%"}}>Modules</th>
              <th style={{width: "8%"}}>Crew</th>
              <th style={{width: "8%"}}>Fuel</th>
              <th style={{width: "8%"}}>Robots in final system</th>
              <th style={{width: "30%"}}>Notes</th>
            </tr>
            <tr className="sample handwritten">
              <td style={{background: "black"}}></td>
              <td>1/6/20</td>
              <td>Autopilot</td>
              <td>The Last Shipyard</td>
              <td>5</td>
              <td>0</td>
              <td>1</td>
              <td>13</td>
              <td>It is very lonely</td>
            </tr>
            {[...Array(13)].map((_, i) => (
              <tr key={i}>
                <td style={{background: i === 0 ? 'black' : 'clear'}}></td>
                <td></td>
                <td></td>
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
